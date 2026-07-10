# AGENTS.md — clearhire-docs

Mirror of `CLAUDE.md` for non-Claude AI agents. See `CLAUDE.md` for the canonical version. Keep both in sync.

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort).
HARD STOP when doc work outpaces the change → ship, then ONE line. No new summary/status files unless asked.

## TL;DR

- Docusaurus 3 documentation site for the **ClearHire** app (https://clearhire.aoneahsan.com).
- Repo `github.com/aoneahsan/clearhire-docs` — **PUBLIC**. NEVER commit secrets (only `.env.example`).
- yarn only (`nvm → npm global → yarn local`); never npm/pnpm. Node >=18.
- Live URL: https://clearhire-docs.aoneahsan.com (Firebase Hosting site `clearhire-docs` + GitHub Pages).
- Baseline: 23 pages covering every shipped feature. Enrichment backlog: `docs/tracking/clearhire-docs-content-tracker.json`.
- Honest framing: only real features; iOS + browser extension are in development (not live); verification proves the relationship, not performance; no fabricated stats.
- Build gates: `yarn typecheck` exit 0 · `yarn build` exit 0. Agent never runs `yarn start`.
- ONE commit per enrichment batch.

## Hard checks before editing

1. Is the product fact you're writing backed by the ClearHire app code / README? If unsure, verify first.
2. Does the page hit the SEO floor (unique title 50-60 / description 140-160, definition-first intro, 3-6 H2s, FAQ on feature/guide pages, author credit)?
3. Are slugs consistent with `sidebars.ts` and `routeBasePath: '/'` (config uses `onBrokenLinks: 'throw'`)?

## Deploy (user-only)

Firebase Hosting site creation + `firebase deploy`, enabling GitHub Pages, and DNS for
`clearhire-docs.aoneahsan.com` are owner-only — see the app repo's `clearhire/docs/MANUAL-TASKS.md`.

## Gitignore Hygiene (IRON-SOLID)
`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build/`dist`/`www`/`node_modules`/logs/caches/IDE), never lose source. Custom rules always present: `*.ignore.*`, `project-record-ignore/`. This is a **PUBLIC** repo -> secrets/`.env`/keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
Gitignore Last Verified: 2026-06-24

## Last Updated

2026-06-22


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)
