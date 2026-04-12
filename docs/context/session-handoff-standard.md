# Session Handoff Standard

Date created: 2026-04-11
Repo: `mark-hintz-portfolio_bg-cad`
Purpose: define the standard handoff method for the remainder of this project so future sessions preserve only the context required to resume effectively.

## Required Skill

Before creating or updating a handoff, activate:

- `Auto Handoff` at `/home/markimus/.agents/skills/handoff/SKILL.md`

Use it as the operational trigger for pausing work, but follow the project-specific rules in this document so the handoff stays high-signal.

## Primary Handoff Files

Use two layers:

1. **Session handoff**
   - canonical file: `docs/plans/YYYY-MM-DD-session-handoff.md`
   - purpose: what changed this session, what is active now, and what the next session should do first

2. **Pause-state handoff**
   - canonical file: `.continue-here.md` at repo root
   - purpose: exact stop point when a session ends mid-task, context is getting full, or work must be resumed without ambiguity

Rule:
- `docs/plans/...session-handoff.md` is the durable human-readable narrative handoff
- `.continue-here.md` is the exact execution checkpoint

## When To Create Or Update Each File

### Update `docs/plans/YYYY-MM-DD-session-handoff.md` when:

- a session materially changes project direction
- new architectural decisions are made
- a new first task for next session is clear
- a previously written handoff is now stale or misleading

### Create or refresh `.continue-here.md` when:

- context is above roughly 50%
- the session ends mid-implementation
- there are uncommitted changes
- the next action is specific and should not be rediscovered
- the work may resume in a different direction than originally planned

## Handoff Content Rules

Every handoff must optimize for resumption speed, not completeness.

Include:

- current branch
- relevant commits created this session
- verification actually run
- exact files changed or likely to be touched next
- decisions that constrain future work
- the first concrete task for the next session
- warnings about ownership or unsafe files
- retrieval instructions if the next session changes direction

Do not include:

- full change logs for trivial edits
- broad repo summaries that do not affect the next step
- repeated explanations already covered by stable docs
- speculative future ideas unless they affect the immediate next decision

## Retrieval Protocol For Next Agent

Future agents should retrieve context in layers.

### Default retrieval path

Read in this order:

1. `/home/markimus/projects/Portfolio/AGENTS.md`
2. `docs/context/mark-agent-onboarding.md`
3. `docs/context/remotion-parallel-work-map.md`
4. latest relevant `docs/plans/*session-handoff.md`
5. `.continue-here.md` if it exists
6. only then inspect the files named by the handoff

### If the task matches the planned next step

Read only:

- the latest session handoff
- `.continue-here.md` if present
- the listed target files

Do not fan out into extra docs unless blocked.

### If the task changes direction

A direction change means any of the following:

- the user asks for work in a different subsystem
- the listed “first task” is no longer the task
- the named target files are no longer where the work lives
- there is evidence the working tree or branch has moved significantly since the handoff

When that happens:

1. read the latest session handoff
2. inspect `git status` and recent commits
3. identify which subsystem now matters
4. read only the stable context docs relevant to that subsystem
5. ignore stale next-step instructions that no longer match the request

## What Must Be Explicit In Every Session Handoff

Each `docs/plans/YYYY-MM-DD-session-handoff.md` must contain these sections:

- `Current Repo State`
- `What Changed This Session`
- `First Task For Next Session`
- `Important Context To Preserve`
- `Current Working Tree`
- `Files Worth Reading First Next Session`
- `Skills To Use Next Session`
- `Known Behavior Note`

If a section has nothing to say, state that briefly instead of omitting it.

## What Must Be Explicit In `.continue-here.md`

Each `.continue-here.md` should contain:

- current task
- exact stop point
- what is done
- what remains
- commands already run
- exact next action
- blockers if any

Keep it execution-focused. Do not duplicate the longer narrative from the session handoff unless needed.

## Skill Guidance For Future Sessions

Use these by default when relevant:

- `Auto Handoff`
  - when pausing, ending, or hitting context pressure
- `brainstorming`
  - before new creative direction, motion treatment, or UI treatment
- `systematic-debugging`
  - when runtime behavior, HMR, Studio, or rendering does not match expectations
- `verification-before-completion`
  - before claiming a fix or implementation is done

For Remotion work, prefer adding:

- `remotion-video-toolkit`
- `remotion-best-practices`

## Quality Standard

A good handoff lets the next agent answer these questions in under two minutes:

- What state is the repo in?
- What changed most recently?
- What should I do first?
- Which files matter?
- What should I avoid touching?
- If the task changed, how do I retrieve the right context without reading everything?

If the handoff does not support those answers quickly, it is too vague or too noisy.
