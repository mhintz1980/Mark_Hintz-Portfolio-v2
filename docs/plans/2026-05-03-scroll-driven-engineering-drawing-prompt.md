# Implementation Prompt — Scroll-Driven Engineering Drawing

Paste this into a new session:

---

Implement the plan at `mark-hintz-portfolio_bg-cad/docs/plans/2026-05-03-scroll-driven-engineering-drawing.md`.

Read these files first, in order:
1. `mark-hintz-portfolio_bg-cad/docs/scroll-driven-engineering-drawing.md` — the concept doc
2. `mark-hintz-portfolio_bg-cad/docs/plans/2026-05-03-scroll-driven-engineering-drawing.md` — the implementation plan

Then inspect the current codebase before writing anything:
- `src/components/drawing-package/DrawingPackagePage.tsx`
- `src/components/drawing-package/DrawingBackground.tsx`
- `src/components/drawing-package/ProjectZone.tsx`
- `src/data/drawingPackageData.ts`
- `src/styles/drawing-package.css`

Key rules:
- Execute the plan task-by-task (Tasks 1–7). Do NOT skip ahead or combine tasks.
- Run `npm run build` after every task as a gate. Do not proceed if the build fails.
- Commit after every task with the commit message from the plan.
- Do NOT delete or rewrite existing components. The plan is additive — existing `ProjectZone`, `DrawingHero`, `SpecTable`, `GeneralNotes`, `TitleBlockHeader`, `TitleBlockFooter`, and `DrawingSheetBorder` all stay. You are modifying them (adding props, wrapping in containers), not replacing them.
- The architecture is background-parallax, NOT giant-canvas. Content stays in normal document flow. The "camera panning" effect comes from the SVG background drifting at different parallax rates on scroll. Read the "Architecture Decision" section of the plan carefully.
- All 5 projects from `projectDetails` must be included (torque-wrench, armament, pump-package, pumptracker, renderings).
- The dev server is already running (`npm run dev`). Check `/drawing-package` in the browser after Tasks 2, 3, 4, and 5 to verify visually.

Start with Task 1.
