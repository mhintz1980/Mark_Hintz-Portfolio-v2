<claude-mem-context>
# Memory Context

# [mark-hintz-portfolio_bg-cad/scroll-driven-engineering-drawing] recent context, 2026-05-11 3:46am EDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 7 obs (1,952t read) | 0t work

### May 4, 2026
192 2:30a 🔵 Git worktree portfolio launches main branch version in browser
193 2:34a 🔵 Git worktree portfolio launching wrong branch version in browser
195 2:48a ✅ Scroll-driven engineering drawing design requirements refined
196 2:49a 🔵 Impeccable frontend design skill context loaded for scroll-driven engineering drawing worktree
197 " 🔵 Scroll-driven engineering drawing implementation structure revealed: DrawingHero component and drawingPackageData data model
198 10:22p 🔵 Git worktree portfolio launches wrong branch version
### May 5, 2026
S85 Caveman mode activated. User requested terse, direct communication style. (May 5, 1:52 AM)
### May 11, 2026
201 2:22a 🔵 DXF to SVG conversion optimization research initiated
</claude-mem-context>

## Spatial Portfolio Project Context

**Role:** Senior Creative Technologist and GSAP Architect.

**Architecture:** The drawing package page is currently a standalone spatial route driven by a GSAP camera stepper, not a normal vertical page. The viewport is still the camera, but the live runtime advances between camera targets from direct wheel, key, and touch input instead of a `ScrollTrigger` scrub timeline. UI stations are absolute React components on the 8800×6800 map.

**Rules:**
- Keep the viewport acting as the camera; move the substrate, not the user.
- Keep Remotion out of the interactive UI. Remotion is only for offline MP4/WebM media rendered into station detail circles.
- New spatial stations must own their local animation with `IntersectionObserver`, not the master GSAP scroll timeline.
- Use Playwright or Chrome DevTools for browser verification. The native agent browser is not reliable in this worktree.
- Update `.continue-here.md`, the active station map, and this context when station coordinates or rig decisions change.

## Current State & Coordinates

### Map Substrate

- Asset: `Lower Receiver-Machined Forging (22).svg`
- Rendered size: 8800px wide × 6800px tall
- Background linework: black-on-transparent SVG using `filter: invert(1)` and `mix-blend-screen`
- DOF blur states:
  - Initial: `invert(1) blur(0px)`
  - Lifted: `invert(1) blur(10px)`
- CSS 3D:
  - Outer container: `perspective: 4000px`, `perspectiveOrigin: 50% 40%`
  - Substrate: `transformStyle: preserve-3d`
  - Safe substrate Y at `scale: 1.2`: about 5806px

### Camera Targets

| Target | cx | cy | scale | rotateX |
|---|---|---|---|---|
| WIDE | `4400` | `3400` | `wide` | `0` |
| HERO | `2000` | `1920` | `hero` | `20` |
| Station A | `1573` | `3338` | `1.2` | `10` |
| Station B | `5673` | `846` | `1.2` | `35` |
| Station C | `3673` | `4379` | `1.2` | `8` |
| Station D | `6973` | `4179` | `1.2` | `12` |
| Station T | `6900` | `6025` | `1.2` | `0` |

### Active Stations

**Hero**
- Inline hero text overlay in `DrawingPackagePage.tsx`
- Camera target: `HERO`
- Word cycle is independent React state, not GSAP timeline data

**Station A:** `TRIGGER GUARD RADIUS`
- Component: `left: 1450px`, `top: 3200px`
- Camera target: `cx: 1573`, `cy: 3338`, `scale: 1.2`, `rotateX: 10`

**Station B:** `BUFFER TUBE SOCKET`
- Component: `left: 5567px`, `top: 833px`
- Camera target: `cx: 5673`, `cy: 846`, `scale: 1.2`, `rotateX: 35`

**Station C:** `INDUSTRIAL DEWATERING PUMP`
- Component: `left: 3500px`, `top: 4200px`
- Camera target: `cx: 3673`, `cy: 4379`, `scale: 1.2`, `rotateX: 8`

**Station D:** `RENDERINGS`
- Component: `left: 6800px`, `top: 4000px`
- Camera target: `cx: 6973`, `cy: 4179`, `scale: 1.2`, `rotateX: 12`

**Station T:** `TITLE BLOCK`
- Component: `left: 6400px`, `top: 5800px`, `width: 1000px`
- Camera target: `cx: 6900`, `cy: 6025`, `scale: 1.2`, `rotateX: 0`

### Current Decisions

- Camera stops are now derived through `computeStop(target, vw, vh)` from target centers plus target scale/tilt.
- Both new DXF-derived exports live in `public/assets/images/`, and the runtime is now on `Lower Receiver-Machined Forging (22).svg`.
- Hidden calibration mode exists at `?calibrate=1`; it forces ProjectZone overlays visible and outlines each 600×500 station box for station solving.
- `ProjectZone` currently owns local GSAP reveal state plus an `active` prop path to bypass `IntersectionObserver` limits from CSS transforms.
- `useLayoutEffect` remains mandatory for GSAP initial visual state to avoid refresh flashes.
- Current source/runtime mismatch: `npm run build` fails because `ProjectZone` call sites omit required `layout`, optional hero DOM query targets are passed too loosely into GSAP, and `TitleBlockStation` is called with `active` though it does not accept props.
- The active docs are restored at:
  - `docs/plans/2026-05-07-3d-perspective-floor-plane.md`
  - `docs/plans/2026-05-08-3d-rig-session-handoff.md`
  - `docs/plans/2026-05-14-drawing-package-doc-catch-up.md`

### Next Implementation Tasks

1. Restore build correctness in the drawing-package route.
2. Re-verify `/drawing-package` in Playwright after the build blockers are fixed.
3. Only then resume the homepage-merge direction if still wanted.
