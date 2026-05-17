# Scroll-Driven Engineering Drawing — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

## Goal

Transform the existing `/drawing-package` portfolio variation into a scroll-driven engineering drawing experience where the visitor feels like they're panning across a massive dark CAD drawing sheet.

## Architecture Decision: Incremental Parallax — Not Giant Canvas

The previous plan proposed a 4000×5000 px absolute-positioned canvas with scroll-mapped camera transforms. That approach has critical flaws:

| Problem | Impact |
|---------|--------|
| `whileInView` / IntersectionObserver breaks inside CSS-translated parents | All Framer Motion entrance animations silently fail |
| Absolute pixel coordinates for every section | Unmaintainable; any content change cascades |
| No responsive story | Fixed-px canvas can't adapt to mobile viewports |
| 4000×5000 div re-composited every frame | GPU memory and paint cost on mid-range devices |
| Replaces working components with worse versions | `ProjectZone` already implements detail views, leader lines, and scroll-driven callouts |

**Revised approach:** Keep all content in normal document flow. Achieve the "camera panning" illusion by scroll-driving the **background SVG parallax** — different SVG groups translate at different rates as the user scrolls, creating the feeling that the viewer's eye is moving across a massive drawing sheet. Use `scroll-snap` for scene stops. Add only the features that don't exist yet: inspection modal, background parallax, scene indicator.

**What already works and must be preserved:**
- `DrawingHero.tsx` — word cycle, spec block, CTAs ✓
- `ProjectZone.tsx` — circular detail views, leader lines, scroll-driven callout draw-in ✓
- `SpecTable.tsx` — BOM-style capabilities table ✓
- `GeneralNotes.tsx` — testimonials as numbered drawing notes ✓
- `TitleBlockHeader.tsx` — sticky top title block ✓
- `TitleBlockFooter.tsx` — revision table, contact, CTAs ✓
- `DrawingSheetBorder.tsx` — viewport ruled borders ✓
- `DrawingBackground.tsx` — 211-line SVG linework ✓
- `drawing-package.css` — OKLCH color system ✓

**Tech Stack:** React, Framer Motion v12, Tailwind CSS, TypeScript, existing CSS variables.

---

### Task 1: Scene Data Model & Navigation Constants

**Files:**
- Modify: `src/data/drawingPackageData.ts`

**Why:** A shared scene registry lets the progress indicator, snap containers, and background parallax all reference the same source of truth. No `canvasPos` — content stays in document flow.

**Step 1: Add the scene type and registry**

```typescript
export type DrawingScene = {
  id: string;
  label: string;              // short label for nav indicator (e.g. "A")
  subtitle: string;           // descriptive subtitle (e.g. "TITLE & SPECS")
  section: 'hero' | 'project' | 'services' | 'testimonials' | 'contact';
  /** How much the background SVG should offset at this scene (0–1 multiplier) */
  parallaxHint: { xFactor: number; yFactor: number; scaleFactor: number };
  projectId?: string;
};

export const drawingScenes: DrawingScene[] = [
  {
    id: 'scene-hero',
    label: 'A',
    subtitle: 'TITLE & SPECS',
    section: 'hero',
    parallaxHint: { xFactor: 0, yFactor: 0, scaleFactor: 1 },
  },
  {
    id: 'scene-p1',
    label: 'B',
    subtitle: 'DETAIL A',
    section: 'project',
    projectId: 'torque-wrench',
    parallaxHint: { xFactor: -0.08, yFactor: -0.04, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p2',
    label: 'C',
    subtitle: 'DETAIL B',
    section: 'project',
    projectId: 'armament',
    parallaxHint: { xFactor: 0.06, yFactor: -0.10, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p3',
    label: 'D',
    subtitle: 'DETAIL C',
    section: 'project',
    projectId: 'pump-package',
    parallaxHint: { xFactor: -0.12, yFactor: -0.16, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p4',
    label: 'E',
    subtitle: 'DETAIL D',
    section: 'project',
    projectId: 'pumptracker',
    parallaxHint: { xFactor: 0.04, yFactor: -0.22, scaleFactor: 1.02 },
  },
  {
    id: 'scene-p5',
    label: 'F',
    subtitle: 'DETAIL E',
    section: 'project',
    projectId: 'renderings',
    parallaxHint: { xFactor: -0.06, yFactor: -0.28, scaleFactor: 1.02 },
  },
  {
    id: 'scene-services',
    label: 'G',
    subtitle: 'CAPABILITIES',
    section: 'services',
    parallaxHint: { xFactor: 0.02, yFactor: -0.34, scaleFactor: 1 },
  },
  {
    id: 'scene-notes',
    label: 'H',
    subtitle: 'GENERAL NOTES',
    section: 'testimonials',
    parallaxHint: { xFactor: -0.10, yFactor: -0.40, scaleFactor: 1 },
  },
  {
    id: 'scene-titleblock',
    label: 'J',
    subtitle: 'TITLE BLOCK',
    section: 'contact',
    parallaxHint: { xFactor: -0.04, yFactor: -0.46, scaleFactor: 1.04 },
  },
];
```

> **Note:** Label "J" follows ASME Y14.1 zone convention which skips "I" to avoid confusion with "1".

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/data/drawingPackageData.ts
git commit -m "feat(drawing-package): add scene data model with parallax hints"
```

---

### Task 2: Scroll-Driven Background Parallax

**Files:**
- Modify: `src/components/drawing-package/DrawingBackground.tsx`
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx`

**Why:** This is the core visual trick. The background SVG linework shifts and scales as the user scrolls, creating the illusion that the viewer's eye is panning across a large drawing. The foreground content scrolls normally.

**Step 1: Add scroll-progress props to DrawingBackground**

Modify `DrawingBackground` to accept an optional `scrollYProgress` MotionValue. Wrap the top-level SVG groups in `<motion.g>` elements with scroll-driven transforms at different parallax rates:

- **Layer 0 (border frame):** Stays fixed — anchors the viewport.
- **Layer 1 (dim background views — views 3, 5, 6, repeated views):** Slow parallax (0.3× rate). These are the farthest "depth" elements.
- **Layer 2 (primary views — views 1, 2, 4, cross-sections):** Medium parallax (0.6× rate). Mid-depth.
- **Layer 3 (dimension annotations, text labels):** Fast parallax (0.9× rate). Nearest depth.

Use `useTransform` to map `scrollYProgress [0, 1]` to translateX/translateY pixel offsets within the SVG coordinate space. Keep offsets small (±50–120px in SVG units) so the drawing drifts subtly, not wildly.

```tsx
// Pseudocode for the parallax layering approach:
import { motion, useTransform, motionValue, type MotionValue } from 'framer-motion';

type Props = { scrollYProgress?: MotionValue<number> };

export function DrawingBackground({ scrollYProgress }: Props) {
  const fallback = motionValue(0);
  const progress = scrollYProgress ?? fallback;

  // Layer 1: Slow drift (background depth)
  const bgX = useTransform(progress, [0, 1], [0, -60]);
  const bgY = useTransform(progress, [0, 1], [0, -80]);

  // Layer 2: Medium drift (mid depth)
  const midX = useTransform(progress, [0, 1], [0, -100]);
  const midY = useTransform(progress, [0, 1], [0, -140]);

  // Layer 3: Fast drift (foreground annotations)
  const fgX = useTransform(progress, [0, 1], [0, -150]);
  const fgY = useTransform(progress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg viewBox="0 0 1920 4800" ...>
        {/* Layer 1: Slow parallax — dim background views */}
        <motion.g style={{ x: bgX, y: bgY }}>
          {/* Views 3, 5, 6, repeated bottom views */}
        </motion.g>

        {/* Layer 2: Medium parallax — primary views */}
        <motion.g style={{ x: midX, y: midY }}>
          {/* Views 1, 2, 4, cross-sections */}
        </motion.g>

        {/* Layer 3: Fast parallax — annotations */}
        <motion.g style={{ x: fgX, y: fgY }}>
          {/* Dimension lines, labels, text */}
        </motion.g>

        {/* Layer 0: Fixed frame — no parallax */}
        <rect x="20" y="20" width="1880" height="4760" ... />
        <rect x="30" y="30" width="1860" height="4740" ... />
      </svg>
    </div>
  );
}
```

**Step 2: Wire scroll progress in DrawingPackagePage**

In `DrawingPackagePage.tsx`, add a ref and `useScroll` to get page-level scroll progress, then pass it to `DrawingBackground`:

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({ target: containerRef });

// ...
<div ref={containerRef} className="drawing-package min-h-screen">
  <DrawingBackground scrollYProgress={scrollYProgress} />
  {/* ... rest unchanged */}
</div>
```

**Step 3: Verify visually**

Run `npm run dev`, navigate to `/drawing-package`, scroll through the page. The background linework should drift subtly at different rates. The foreground content should scroll normally. Adjust pixel offsets if the movement is too aggressive or too subtle.

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/components/drawing-package/DrawingBackground.tsx src/components/drawing-package/DrawingPackagePage.tsx
git commit -m "feat(drawing-package): add scroll-driven parallax to SVG background"
```

---

### Task 3: Scroll-Snap Scene Containers

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx`
- Modify: `src/styles/drawing-package.css`

**Why:** Scroll snap gives the "scene stop" behavior — the page gently locks to each section boundary as the user scrolls, making it feel like the drawing view is settling on a specific region. Using `proximity` instead of `mandatory` avoids trapping users who want to free-scroll.

**Step 1: Add snap CSS**

Add to `drawing-package.css`:

```css
.drawing-package {
  scroll-snap-type: y proximity;
}

.drawing-scene {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

**Step 2: Wrap sections with scene containers**

In `DrawingPackagePage.tsx`, wrap each major section in a `<section>` with `className="drawing-scene"` and `id={scene.id}` matching the scene registry:

```tsx
<section id="scene-hero" className="drawing-scene">
  <DrawingHero />
</section>

<SectionDivider label="C — C" subtitle="PROJECT DETAIL VIEWS" />

{projectDetails.map((project, i) => (
  <section key={project.id} id={`scene-p${i + 1}`} className="drawing-scene">
    <ProjectZone project={project} index={i} onClick={() => openModal(project)} />
  </section>
))}

<SectionDivider label="D — D" subtitle="CAPABILITIES SPECIFICATION" />

<section id="scene-services" className="drawing-scene">
  <SpecTable />
</section>

{/* etc. */}
```

**Step 3: Verify scroll-snap behavior**

Run `npm run dev`. Scroll should gently snap to section boundaries. Verify it doesn't feel jarring — proximity should be smooth. Test on a trackpad and mousewheel.

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/components/drawing-package/DrawingPackagePage.tsx src/styles/drawing-package.css
git commit -m "feat(drawing-package): add scroll-snap scene containers"
```

---

### Task 4: Project Inspection Modal

**Files:**
- Create: `src/components/drawing-package/ProjectInspectionModal.tsx`
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx`
- Modify: `src/components/drawing-package/ProjectZone.tsx`

**Why:** The concept doc specifies a click-to-inspect interaction. The existing `ProjectZone` has no click handler or expanded view. This adds a full-screen modal styled as an inspection drawing overlay.

**Step 1: Create ProjectInspectionModal**

Requirements:
- Full-screen overlay with `AnimatePresence` enter/exit
- Dark semi-transparent backdrop (click to close)
- Project image displayed large (not circular — the modal shows the full image)
- Title-block-style info pane showing project title, detail label, and all callout notes as a table
- Close button: top-right `✕`, visible and accessible
- Keyboard: `Escape` key closes the modal
- Focus trap: on mount, focus the close button; on unmount, restore focus
- Body scroll lock: prevent background scrolling while modal is open
- Styling: match `--dp-*` CSS variables, monospace, uppercase, ruled borders

```tsx
// Structural outline — implement fully:
export function ProjectInspectionModal({
  project,
  onClose,
}: {
  project: ProjectDetail;
  onClose: () => void;
}) {
  // useEffect for Escape key listener
  // useEffect for body overflow lock
  // useRef for close button focus

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Content panel */}
      <motion.div
        className="relative z-10 max-w-5xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-0 border-2"
        style={{ borderColor: 'var(--dp-border)', background: 'var(--dp-bg)' }}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
      >
        {/* Image half */}
        <div className="aspect-square overflow-hidden">
          <img src={...} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Info half — title block style */}
        <div className="p-6 flex flex-col">
          {/* Detail label header */}
          {/* Callout notes as ruled rows */}
          {/* Close button */}
        </div>
      </motion.div>
    </motion.div>
  );
}
```

**Step 2: Add click handler to ProjectZone**

Modify `ProjectZone` to accept an `onClick?: () => void` prop. Add `cursor-pointer` to the circular frame div and attach the handler. Do NOT change any existing animation behavior.

**Step 3: Wire modal state in DrawingPackagePage**

```tsx
const [inspectedProject, setInspectedProject] = useState<ProjectDetail | null>(null);

// In render:
<AnimatePresence>
  {inspectedProject && (
    <ProjectInspectionModal
      project={inspectedProject}
      onClose={() => setInspectedProject(null)}
    />
  )}
</AnimatePresence>

// Pass onClick to each ProjectZone:
<ProjectZone
  project={project}
  index={i}
  onClick={() => setInspectedProject(project)}
/>
```

**Step 4: Verify modal behavior**

- Click a project circle → modal opens with correct project data
- Click backdrop → closes
- Press Escape → closes
- Background doesn't scroll while modal is open
- Tab focus is trapped inside the modal

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add src/components/drawing-package/ProjectInspectionModal.tsx src/components/drawing-package/DrawingPackagePage.tsx src/components/drawing-package/ProjectZone.tsx
git commit -m "feat(drawing-package): add project inspection modal with focus trap"
```

---

### Task 5: Scene Progress Indicator

**Files:**
- Create: `src/components/drawing-package/SceneIndicator.tsx`
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx`

**Why:** With 9 scenes, the user needs a sense of position. A fixed-position indicator on the right edge — styled as drawing zone markers — gives spatial awareness and click-to-navigate.

**Step 1: Create SceneIndicator**

Requirements:
- Fixed position, right edge, vertically centered
- One dot/marker per scene from `drawingScenes`
- Active scene highlighted (accent color, slightly larger)
- Each marker shows its label (A, B, C, ... J) on hover
- Clicking a marker smooth-scrolls to that section via `document.getElementById(scene.id)?.scrollIntoView({ behavior: 'smooth' })`
- Active scene detection: use `IntersectionObserver` watching each `#scene-*` element
- Styled as small bordered circles with monospace labels, matching `--dp-accent`

```tsx
// Structural outline:
export function SceneIndicator() {
  const [activeScene, setActiveScene] = useState('scene-hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    drawingScenes.forEach((scene) => {
      const el = document.getElementById(scene.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
         aria-label="Drawing sections">
      {drawingScenes.map((scene) => (
        <button
          key={scene.id}
          onClick={() => document.getElementById(scene.id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`group relative w-6 h-6 rounded-full border flex items-center justify-center
            text-[8px] font-bold font-mono transition-all duration-200
            ${activeScene === scene.id ? 'scale-125' : 'scale-100'}`}
          style={{
            borderColor: activeScene === scene.id ? 'var(--dp-accent)' : 'var(--dp-border)',
            color: activeScene === scene.id ? 'var(--dp-accent)' : 'var(--dp-text-dim)',
            background: activeScene === scene.id ? 'var(--dp-accent-dim)' : 'transparent',
          }}
          aria-label={`${scene.label}: ${scene.subtitle}`}
          aria-current={activeScene === scene.id ? 'true' : undefined}
        >
          {scene.label}
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 whitespace-nowrap opacity-0 group-hover:opacity-100
            text-[9px] tracking-widest uppercase pointer-events-none transition-opacity"
            style={{ color: 'var(--dp-text-dim)' }}>
            {scene.subtitle}
          </span>
        </button>
      ))}
    </nav>
  );
}
```

**Step 2: Mount in DrawingPackagePage**

Add `<SceneIndicator />` inside the page wrapper, after the main content. It positions itself via `fixed`.

**Step 3: Verify behavior**

- Scroll through the page — active marker updates
- Click a marker — smooth scrolls to that section
- Hover a marker — tooltip shows subtitle
- Does not obscure content on mobile (consider `hidden md:flex` if needed)

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/components/drawing-package/SceneIndicator.tsx src/components/drawing-package/DrawingPackagePage.tsx
git commit -m "feat(drawing-package): add scene progress indicator with click-to-navigate"
```

---

### Task 6: Mobile Responsive Adjustments

**Files:**
- Modify: `src/components/drawing-package/DrawingBackground.tsx`
- Modify: `src/components/drawing-package/SceneIndicator.tsx`
- Modify: `src/components/drawing-package/ProjectInspectionModal.tsx`
- Modify: `src/styles/drawing-package.css`

**Why:** The concept doc requires "Text must remain readable on mobile." The parallax and snap behavior need tuning for touch devices.

**Step 1: Reduce parallax on mobile**

In `DrawingBackground`, detect viewport width (or use a media query hook) and halve the parallax offsets on screens under 768px. Alternatively, disable parallax entirely below 640px where performance is more constrained.

**Step 2: Hide SceneIndicator on small screens**

Add `hidden md:flex` to the indicator's outer container. On mobile, the indicator dots are too small to be useful as tap targets and clutter the viewport.

**Step 3: Modal goes full-screen on mobile**

On screens under 768px, the modal should be full-width/full-height instead of a centered card. The grid should stack vertically (image on top, info below). Adjust the close button position for thumb reach.

**Step 4: Scroll-snap adjustment**

On mobile, consider switching to `scroll-snap-type: y mandatory` (stricter snapping) or disabling snap entirely if the sections are shorter than the viewport. Test and decide.

**Step 5: Verify on mobile viewport**

Use browser devtools device emulation at 375px (iPhone SE) and 390px (iPhone 14). Verify:
- All text readable
- ProjectZone callouts don't overflow
- Modal is usable
- No horizontal scroll

**Step 6: Verify build**

```bash
npm run build
```

**Step 7: Commit**

```bash
git commit -a -m "fix(drawing-package): mobile responsive adjustments for parallax, modal, and indicator"
```

---

### Task 7: Accessibility & Polish

**Files:**
- Modify: `src/components/drawing-package/DrawingPackagePage.tsx`
- Modify: `src/components/drawing-package/DrawingBackground.tsx`
- Modify: `src/components/drawing-package/ProjectInspectionModal.tsx`

**Why:** Final pass for accessibility requirements and motion preferences.

**Step 1: `prefers-reduced-motion` support**

- **Background parallax:** If `useReducedMotion()` returns true, pass no scroll progress to `DrawingBackground` (static background, no drift).
- **Scroll snap:** Reduced motion users should still get snap behavior (it's not animation, it's layout).
- **Modal:** Use instant transitions instead of scale/fade.
- **ProjectZone:** Already respects reduced motion via existing `shouldReduceMotion` checks ✓

**Step 2: Verify semantic structure**

- Page has one `<h1>` (in DrawingHero) ✓
- Each section uses `<section>` with meaningful content ✓
- `<main>` wraps primary content ✓
- `<footer>` wraps the title block ✓
- `<nav>` wraps the scene indicator ✓

**Step 3: Verify image alt text**

- All project images in `ProjectZone` use `alt={project.title}` ✓
- Modal image must also have alt text
- Background SVG is decorative — `aria-hidden="true"` on the container

**Step 4: Add `aria-hidden="true"` to DrawingBackground container**

The SVG linework is purely decorative. Screen readers should skip it.

**Step 5: Final build verification**

```bash
npm run build
```

Expected: PASS — no TypeScript errors, no unused imports.

**Step 6: Manual visual audit**

Run `npm run dev`, navigate to `/drawing-package`. Verify:

| Criterion | Expected |
|-----------|----------|
| Hero loads with word cycle animation | ✓ |
| Background linework drifts on scroll | Subtle, 3-depth parallax |
| Page snaps to scene boundaries | Gentle (proximity), not jarring |
| 5 project detail views render | Circular frames, leader lines, callouts |
| Clicking a project opens modal | Fade in, image + info grid |
| Modal closes on Escape / backdrop | ✓ |
| Scene indicator shows position | Active marker tracks scroll |
| Services table renders as BOM | Ruled rows, tags |
| General Notes render as numbered notes | ✓ |
| Title block footer has contact + revision table | ✓ |
| Mobile: all text readable at 375px | ✓ |
| Reduced motion: no background drift | ✓ |

**Step 7: Commit**

```bash
git commit -a -m "fix(drawing-package): accessibility pass — reduced motion, aria, semantic structure"
```

---

## File Ownership Summary

| File | Action | Task |
|------|--------|------|
| `src/data/drawingPackageData.ts` | Modify | 1 |
| `src/components/drawing-package/DrawingBackground.tsx` | Modify | 2, 6, 7 |
| `src/components/drawing-package/DrawingPackagePage.tsx` | Modify | 2, 3, 4, 5, 7 |
| `src/styles/drawing-package.css` | Modify | 3, 6 |
| `src/components/drawing-package/ProjectZone.tsx` | Modify | 4 |
| `src/components/drawing-package/ProjectInspectionModal.tsx` | Create | 4, 6, 7 |
| `src/components/drawing-package/SceneIndicator.tsx` | Create | 5, 6 |

No existing components are deleted. All modifications are additive or prop-extension.
