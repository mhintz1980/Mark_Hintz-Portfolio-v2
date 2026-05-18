# Session Handoff: Homepage Stack Scroll Bug

**Date:** 2026-05-18  
**Repo:** `/home/markimus/projects/Portfolio/mark-hintz-portfolio_bg-cad`  
**Branch:** `main`  
**Base commit at handoff:** `4aadd70`  
**Primary route:** `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/`  
**Related standalone route to preserve:** `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/drawing-package`

## Current Repo State

The homepage has uncommitted changes ported from `https://github.com/mhintz1980/project-start.git`. The work is not finished because the torque-gun stacked-card scroll interaction still fails in the browser.

Current working tree includes edits to:

- `src/App.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/EngineeringReel.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Projects.tsx`
- `src/data/portfolioData.ts`
- `src/data/portfolioData.test.ts`

New files:

- `src/components/sections/StackedCardsProject.tsx`
- `src/components/sections/StackedCardsProject.test.ts`
- `docs/plans/2026-05-18-homepage-stack-scroll-bug-handoff.md`

## What Changed This Session

The first portfolio page was updated with changes from `project-start`:

- Added the collapsible navigation behavior from `project-start`.
- Preserved this repo's `Drawing` nav link into `/drawing-package`.
- Kept `/drawing-package` as a standalone route outside the homepage shell.
- Added the torque-gun featured stacked-card section.
- Updated homepage copy and project data from `project-start`.
- Added helper math and tests for the stack card progress windows.

The previous agent attempted to make card exits sequential by changing `StackedCardsProject.tsx`, but the user reports that the page still scrolls past the images and does not stick.

## First Task For Next Session

Fix the sticky containment before touching animation math again.

Start in `src/App.tsx`. The homepage shell currently uses:

```tsx
<main className="relative z-10 w-full overflow-hidden selection:bg-accent-primary/20 selection:text-accent-primary">
```

Change the wrapper to avoid vertical overflow clipping, for example:

```tsx
<main className="relative z-10 w-full overflow-x-clip selection:bg-accent-primary/20 selection:text-accent-primary">
```

Then verify whether the `StackedCardsProject` sticky child actually pins while scrolling through the section.

## Important Context To Preserve

User's expected interaction:

- The Industrial Torque Wrench cards should appear in a sticky section.
- Cards animate upward one by one as scroll progresses.
- After the final card exits, normal vertical scrolling resumes down the homepage.

User's actual report:

- The section is not sticking.
- The page scrolls right past the torque-gun images.
- DevTools warning:

```text
installHook.js:1 Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.
```

Likely root-cause area:

- CSS sticky containment and/or Framer Motion `useScroll` target/container measurement.
- The app shell's `overflow-hidden` is a strong suspect.
- `StackedCardsProject.tsx` already sets `section` to `relative`, so do not assume the warning means only the stack section lacks position.

## Current Working Tree

There are uncommitted homepage changes. Do not reset them.

Do not commit/push until:

- sticky behavior is verified in browser,
- `npm test` passes,
- `npm run build` passes,
- user confirms the local page behavior is acceptable or explicitly asks to publish.

## Files Worth Reading First Next Session

1. `.continue-here.md`
2. `src/App.tsx`
3. `src/components/sections/StackedCardsProject.tsx`
4. `src/components/sections/Projects.tsx`
5. `src/data/portfolioData.ts`
6. `src/components/layout/Navbar.tsx`

Optional reference:

- `/tmp/project-start-portfolio` may no longer exist next session. Re-clone `https://github.com/mhintz1980/project-start.git` only if you need to compare source behavior.

## Skills To Use Next Session

- `superpowers:systematic-debugging` for the sticky/scroll bug.
- `impeccable` if visual design changes are made to the homepage.
- `superpowers:verification-before-completion` before claiming the bug is fixed.

## Known Behavior Note

Tests currently cannot prove the sticky effect. The added `StackedCardsProject.test.ts` only verifies progress-window helper math. The real bug is a browser behavior issue and must be validated with actual scroll behavior.

Recommended browser checks:

- Start at `http://127.0.0.1:5174/Mark_Hintz-Portfolio-v2/`.
- Scroll to `Projects`.
- Confirm the stack section pins at the viewport top.
- Confirm `[data-stack-card="0"]`, `[data-stack-card="1"]`, etc. move upward in sequence while the sticky region remains pinned.
- Confirm the Armament project grid appears after the final torque-gun card.

Keep the `Drawing` nav item and `/drawing-package` route intact throughout the fix.
