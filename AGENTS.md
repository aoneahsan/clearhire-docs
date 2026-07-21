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
- Honest framing: only real features; verification proves the relationship, not performance; no fabricated stats; no "free/best/#1/top" as selling adjectives — state pricing factually.
- Build gates: `yarn typecheck` exit 0 · `yarn build` exit 0. Agent never runs `yarn start`.
- Local search via `@easyops-cn/docusaurus-search-local` — the index exists only after a real build, so verify with `yarn build && yarn serve`, never `yarn start`.
- ONE commit per enrichment batch.

## Verified product facts (2026-07-21) — do not regress these

- **Sign-in is Google-only.** There is no email/password registration.
- **iOS does not exist** — no build, not in review, no date. Never write "in development".
- **The browser extension is built (v1.1.1) but published nowhere.** Chrome Web Store submission is
  pending. It supports **LinkedIn, Indeed, Glassdoor only** (never Workable/Greenhouse/Lever, never
  "25+ sites"), its data is browser-local and does **not** sync to a ClearHire account, and its
  analytics are opt-in and off by default. Never link a store URL that does not exist yet.
- **App analytics** (Firebase, Amplitude, Microsoft Clarity) have **no** user opt-out — only the
  extension's analytics are opt-in.
- **Pricing:** the public app costs nothing; a separate paid **white-label license** exists.
- **Versions:** docs describe the 1.10.x line. 1.9.0/1.9.1 were never published — do not cite them.
  The Play listing is authoritative for the published Android version.
- **Support link** is always
  `https://aoneahsan.com/payment?project-id=clearhire&project-identifier=com.aoneahsan.clearhire`.

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

2026-07-21 — accuracy pass vs the app: sign-in Google-only, iOS/extension claims corrected, version
claims fixed, payment links parameterised, local search added, broken-link/anchor checks set to `throw`.


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) for ANY work in
   this project — they cannot invoke /skills, which RULE #0 makes mandatory. Do ALL work (planning, implementation,
   review, exploration) in the MAIN context. A sub-agent is allowed ONLY when a CUSTOM agent exists in
   `.claude/agents/` for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a needed
   skill is missing, download/enable/install it (or use the nearest installed equivalent and say so) — never
   proceed skill-less.
3. **Model workflow:** PLAN and REVIEW on **Fable 5**; EXECUTE the approved plan on **Opus 4.8**. Plans in
   `~/.claude/plans/`; multi-phase features keep a resumable tracker (`docs/features/<slug>/00-tracker.json`),
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
