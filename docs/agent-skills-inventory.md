# Agent Skills Inventory

This repository uses project-local **copied** skills. The shared source is `.agents/skills`; consumer copies are installed for `.claude/skills` and `.zcode/skills`. Copying, rather than symlinking, keeps the project portable across Windows worktrees and the three requested agent environments. Codex can consume the shared `.agents/skills` source; this installation manager has no dedicated Codex target.

## Installed and Reproducible

| Skill | Installed targets | Canonical source | Revision / integrity | Notes |
|---|---|---|---|---|
| `design-taste-frontend` (taste v2) | Shared, Claude Code, Zcode | [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill) | Lockfile SHA-256 `6d838b246d0e35d0b53f4f23f98ba7a1dd561937e64f7d0c7553b0928e376c3e` | Installed as the current `design-taste-frontend`, which the source identifies as the v2 experimental rewrite. |
| `redesign-existing-projects` | Shared, Claude Code, Zcode | [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill) | Lockfile SHA-256 `b405eee0e0e80fc243f731d9aa368bca307e356db7e6157d27101d369dac6726` | Uses the source path `skills/redesign-skill/SKILL.md`. |
| `unlazy` | Shared, Claude Code, Zcode | [`abhilash333naidu/unlazy`](https://github.com/abhilash333naidu/unlazy) | PR #5 head `77662148c4a08980e92a63cd175e87e16ed74352`; SKILL.md SHA-256 `2e3cc1ca2c6c3100442765ff947d87392e82b5757bfb64eba475983f5cd6d877` | Exact head requested. The optional Claude Code stop hook has **not** been enabled. |
| `gsap-scrolltrigger` | Shared, Claude Code, Zcode | [`greensock/gsap-skills`](https://github.com/greensock/gsap-skills) | Lockfile SHA-256 `1cdc5647693783cb7a662d84a5de434c88a051ed56b4d33597c9b5782b5973e6` | Official GreenSock skill. |

The project already carried the separate `impeccable` skill in `skills-lock.json`; it has been left unchanged.

## Local-Only Skills Still Awaiting Source Transfer

The sandbox does not expose the Windows path `C:\Users\Markimus\.agents` or the local Claude Code, Codex, and Zcode directories. To avoid recreating or silently substituting house skills, the following skills have **not** been fabricated or replaced.

| Skill | User-recorded origin | Expected source location |
|---|---|---|
| `bounded-gauntlet-orchestration` | House; chapter-1 gauntlet run | Zcode local skills directory |
| `cad-scene-graph-rigging` | House; rewritten to D1-AP model | Zcode local skills directory |
| `webgl-telemetry-verifier` | House; rewritten in the same session | Zcode local skills directory |
| `asset-and-bundle-hygiene` | House; deploy/hosting audit | Zcode local skills directory |
| `r3f-scroll-performance-guard` | House; 60 fps discipline | Zcode local skills directory |
| `spatial-hotspot-a11y` | House; role-map to hotspots | Zcode local skills directory |
| `glsl-transition-shader-pipeline` | House; CadTransitionShader | Zcode local skills directory |
| `scroll-film-studio` | Manus zip from the video; Super website v2 / Kimi K3 | `~/.agents` |
| `animated-3d-video-sites` | House; converted from a J-Gun repository draft | `~/.agents` |

After the local directories or an archive are supplied, copy each complete skill folder (including `SKILL.md` and its references, scripts, templates, or assets) into `.agents/skills/<skill-name>/`, then mirror it to `.claude/skills/` and `.zcode/skills/`. Add its immutable source and SHA-256 checksum to `skills-lock.json` before committing.

## Safety and Portability Note

Skills execute as agent instructions and may include scripts. Source folders should be reviewed before use. In particular, `unlazy` includes an optional Claude Code stop hook; it is deliberately present but inactive, and must only be enabled with explicit approval.

## References

[1] [Taste Skill repository](https://github.com/leonxlnx/taste-skill)

[2] [Unlazy PR #5](https://github.com/Leonxlnx/unlazy/pull/5)

[3] [GreenSock GSAP Skills repository](https://github.com/greensock/gsap-skills)
