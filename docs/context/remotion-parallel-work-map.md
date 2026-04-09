# Remotion Parallel Work Map

Purpose: help multiple agents work inside `mark-hintz-portfolio_bg-cad/remotion` without colliding.

## Shared Infrastructure Files

These should usually have a single owner at a time:
- `remotion/src/Root.tsx`
- `remotion/src/Video.tsx`
- `remotion/src/constants.ts`
- `remotion/src/schemas.ts`
- `remotion/src/components/AnimationPrimitives.tsx`
- `remotion/src/components/UIAtoms.tsx`
- `remotion/package.json`

Why:
- changes here affect multiple scenes or all Studio-editable props
- merge conflicts are more likely
- behavioral regressions can ripple through every composition

## Safer Single-Owner Scene Files

These are better candidates for isolated parallel work:
- `remotion/src/scenes/BlueprintGridScene.tsx`
- `remotion/src/scenes/IdentityCardScene.tsx`
- `remotion/src/scenes/ProjectScene.tsx`
- `remotion/src/scenes/SkillsCTAScene.tsx`
- `remotion/src/experiments/CaseStudiesVideo.tsx`
- `remotion/src/scenes/experiments/case-studies/CaseStudyScene.tsx`

Rule:
- one scene file = one owner at a time

## Good Parallel Split Examples

Example A:
- Agent 1: shared schema and Studio controls
- Agent 2: opening and identity scenes
- Agent 3: case-study experiment scenes

Example B:
- Agent 1: `ProjectScene.tsx` animation refinement
- Agent 2: `SkillsCTAScene.tsx` and closing polish
- Agent 3: new experimental compositions under `src/experiments/`

## Unsafe Parallel Patterns

Avoid:
- two agents editing `Root.tsx` at once
- two agents editing `Video.tsx` at once
- one agent changing `schemas.ts` while another changes Studio save behavior in `Root.tsx`
- one agent changing shared UI atoms while another is also refactoring scene layout assumptions

## Working Agreement

Before parallel work starts, decide:
- who owns shared architecture
- who owns each scene file
- whether a task is additive or refactor-heavy

If a task changes layout primitives, Studio schemas, or composition wiring, announce that explicitly because it affects everyone else.
