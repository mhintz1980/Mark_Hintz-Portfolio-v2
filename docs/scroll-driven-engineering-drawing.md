# Task: Convert Mark Hintz Portfolio into Scroll-Driven Engineering Drawing Experience

## Goal

Transform the existing portfolio into a high-end engineering drawing inspired portfolio page.

The page should feel like the visitor is navigating across a large dark CAD/blueprint-style manufacturing drawing. The user should only see one region of the drawing at a time. As the user scrolls, the background should pan, scale, and parallax like the camera is moving through drawing views, title blocks, revision tables, notes, and detail callouts.

This should be built inside the existing React/Vite repo:

Repository:
`mhintz1980/Mark_Hintz-Portfolio-v2`

Important existing route:
`/drawing-package`

Important existing files:
- `src/App.tsx`
- `src/components/drawing-package/DrawingPackagePage.tsx`
- `src/components/drawing-package/DrawingBackground.tsx`
- `src/components/drawing-package/ProjectZone.tsx`
- `src/components/drawing-package/SpecTable.tsx`
- `src/components/drawing-package/GeneralNotes.tsx`
- `src/components/drawing-package/TitleBlockHeader.tsx`
- `src/components/drawing-package/TitleBlockFooter.tsx`
- `src/data/drawingPackageData.ts`
- `src/styles/drawing-package.css`

Do not rebuild the whole portfolio from scratch. Reuse the existing drawing-package route and components where practical.

---

## Design Concept

The page is one oversized engineering drawing sheet.

The visitor scrolls through these regions:

1. **Hero/About**
   - Upper-left drawing region.
   - Shows animated hero text and about/spec block.
   - Should feel like the drawing title and introductory specification zone.

2. **Projects**
   - User scrolls into mechanical orthographic drawing areas.
   - Each project appears as a raised circular detail viewport.
   - The viewport should animate out of the drawing background.
   - Project callouts use leader lines, detail labels, tolerance/material/process/outcome notes.
   - Four primary projects should be presented as separate scroll scenes.

3. **Project Modal**
   - Clicking a project detail circle opens a full-screen inspection modal.
   - Modal should allow horizontal image browsing.
   - Include close button.
   - Auto-exit behavior is optional, but should not trap the user.
   - Must support keyboard escape and accessible close behavior.

4. **Services**
   - Should appear as a drawing specification table, revision table, or BOM-like table.
   - Containers should look like they sit above the drawing.
   - Include service names, descriptions, and rates if data is available.
   - If rates are not available, leave a clean placeholder field.

5. **Testimonials**
   - Format like drawing NOTES.
   - Should resemble bottom-corner general notes on an engineering drawing.
   - Use numbered notes or boxed note callouts.

6. **Contact**
   - Final scene should land on the title block area.
   - Contact information should be inside title-block-style cells.

---

## Technical Direction

Use the existing stack:
- React
- TypeScript
- Tailwind
- Framer Motion
- Existing drawing-package CSS variables
- Existing data files where possible

Prefer Framer Motion for scroll transforms unless GSAP ScrollTrigger is already clearly better for the existing codebase.

Create a scene-based scroll architecture.

Recommended new components:

```txt
src/components/drawing-package/
  DrawingPortfolioPage.tsx
  DrawingSceneController.tsx
  DrawingViewportCamera.tsx
  DrawingParallaxLayer.tsx
  DrawingProjectScene.tsx
  ProjectInspectionModal.tsx
  DrawingServicesScene.tsx
  DrawingNotesTestimonials.tsx
  DrawingTitleBlockContact.tsx
```

Or modify the existing components if that is cleaner.

---

## Scene Model

Create a data model similar to this:

```ts
type DrawingScene = {
  id: string;
  label: string;
  section: 'hero' | 'project' | 'services' | 'testimonials' | 'contact';
  camera: {
    x: number;
    y: number;
    scale: number;
  };
  parallax?: {
    lineworkX?: number;
    lineworkY?: number;
    opacity?: number;
  };
  projectId?: string;
};
```

The scroll controller should map scroll progress to camera movement.

The page should feel like:

```txt
Scene 1: upper-left hero/about
Scene 2: project detail A
Scene 3: project detail B
Scene 4: project detail C
Scene 5: project detail D
Scene 6: services/revision table
Scene 7: testimonials/notes
Scene 8: contact/title block
```

---

## Visual Requirements

Use a dark engineering drawing aesthetic:

- Dark navy/black background
- Fine white/light-gray CAD linework
- Blue accent for detail circles and leader lines
- Thin ruled tables
- Monospace technical labels
- Large title-block typography
- Faint orthographic views in the background
- Foreground content appears as raised detail views, callout boxes, notes, or title-block cells

The result should look professional, not gimmicky.

Avoid generic tech startup styling.

Avoid glassmorphism unless extremely subtle.

Avoid random floating icons.

The page should feel like it was designed by someone who actually works with drawings, tolerances, assemblies, and manufacturing documentation.

---

## Motion Requirements

Use scroll-driven movement:

- Background drawing linework slowly shifts in X/Y.
- Drawing sheet can slightly scale between scenes.
- Detail circles rise/scale into view.
- Leader lines draw in.
- Callouts fade/slide in.
- Respect `prefers-reduced-motion`.

Do not overdo motion. The movement should feel precise and mechanical, not bouncy.

---

## Performance Requirements

- Keep SVG linework lightweight.
- Use optimized images: WebP where possible.
- Lazy-load project images.
- Avoid heavy 3D unless explicitly enabled later.
- Keep the first implementation image-based, not full Three.js.
- Must pass `npm run build`.

---

## Accessibility Requirements

- All project images need alt text.
- Modal must be keyboard closeable with Escape.
- Modal close button must be visible and accessible.
- Scrolling must not trap the user.
- Respect reduced motion.
- Text must remain readable on mobile.

---

## Implementation Plan

1. Inspect existing drawing-package files.
2. Keep `/drawing-package` route working.
3. Build or refactor toward a scene-based scroll controller.
4. Reuse existing `projectDetails` from `src/data/drawingPackageData.ts`.
5. Add a click-to-open project modal for circular detail views.
6. Rework services into a spec/revision/BOM table scene.
7. Rework testimonials into drawing notes.
8. Rework contact into a title block.
9. Run:
   - `npm run build`
   - `npm run test` if tests exist
10. Report changed files and any known limitations.

---

## Acceptance Criteria

The implementation is successful when:

- Visiting `/drawing-package` shows a full engineering drawing inspired portfolio.
- Hero/About is the first drawing region.
- Four project scenes appear while scrolling.
- Each project uses a circular detail viewport.
- Clicking a project opens an inspection modal.
- Services appear as a drawing/spec table.
- Testimonials appear as drawing notes.
- Contact appears as a title block.
- Background linework pans/parallaxes across scroll scenes.
- Site builds without TypeScript errors.