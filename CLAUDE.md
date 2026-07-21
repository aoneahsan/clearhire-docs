# CLAUDE.md — clearhire-docs

Public Docusaurus documentation site for the **ClearHire** app.

> Global + workspace rules auto-load from `~/.claude/CLAUDE.md`, `~/.claude/rules/*.md`, and
> `~/Documents/ahsan-work/code/CLAUDE.md`. This file is project-specific only. `CLAUDE.md` and
> `AGENTS.md` are mirrors — keep both in sync.

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort) —
never let recording outpace the work. HARD STOP when doc work outpaces the change → ship, then ONE
line if anything. No new summary/status/completion files unless asked. Full rule: `~/.claude/CLAUDE.md`.

## Identity

| Key | Value |
|---|---|
| Repo | `github.com/aoneahsan/clearhire-docs` — **PUBLIC** |
| Type | Docusaurus 3 documentation site (classic preset + Mermaid) |
| Package manager | yarn only (`nvm → npm global → yarn local`); never npm/pnpm |
| Node | >=18 |
| Author | Ahsan Mahmood (aoneahsan@gmail.com) |
| Live URL | https://clearhire-docs.aoneahsan.com (Firebase Hosting site `clearhire-docs` + GitHub Pages) |
| Documents | the ClearHire app at `~/Documents/ahsan-work/code/production-projects/clearhire` |
| App URL | https://clearhire.aoneahsan.com |
| Play Store | https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire |
| Dev port | 5962 (start) / 5963 (serve) |
| Build gates | `yarn typecheck` exit 0 · `yarn build` (→ `./build`) exit 0 |

## Critical rules

| Rule | Detail |
|---|---|
| PUBLIC repo — no secrets | This repo is PUBLIC. NEVER commit real env/keys. Only `.env.example` if needed; `.env` stays git-ignored. |
| Honest framing | Document only real, shipped features. No fabricated stats. Verification proves the working relationship, not job performance. No "free/best/#1/top" as selling adjectives — state pricing factually instead. |
| Verified product facts (2026-07-21) | **Sign-in is Google-only** (no email/password). **iOS does not exist** — no build, no date. **Extension is built (v1.1.1) but unpublished**; Chrome Web Store submission pending; supports **LinkedIn, Indeed, Glassdoor only**; its data is browser-local and does **not** sync to a ClearHire account; its analytics are opt-in, off by default. App analytics (Firebase/Amplitude/Clarity) have **no** user opt-out. A paid **white-label license** exists alongside the free public app. Never link a store URL that does not exist yet. |
| Single source of truth | Every product fact comes from the ClearHire app code / README. Don't invent features or screens. |
| SEO floor | Every page: unique title (50-60 chars) + description (140-160), definition-first intro, 3-6 H2 sections, FAQ on feature/guide pages, author credit on longer pages. |
| One commit per batch | Docs enrichment is committed one batch at a time. |
| No dev servers in agent runs | The agent runs `yarn build` / `yarn typecheck` only; the user runs `yarn start`. |

## Verification

```bash
yarn typecheck   # tsc --noEmit (exit 0)
yarn build       # docusaurus build → ./build (exit 0)
```

## Content tracker

Resumable enrichment backlog: `docs/tracking/clearhire-docs-content-tracker.json`. Baseline (23
pages covering every shipped feature) is complete; deep-enrichment batches are listed there.

## Manual / user-only tasks (deploy)

Firebase Hosting site creation + `firebase deploy`, enabling GitHub Pages, and DNS for
`clearhire-docs.aoneahsan.com` are owner-only — tracked in the app repo's
`clearhire/docs/MANUAL-TASKS.md`.

## Gitignore Hygiene (IRON-SOLID)
`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build/`dist`/`www`/`node_modules`/logs/caches/IDE), never lose source. Custom rules always present: `*.ignore.*`, `project-record-ignore/`. This is a **PUBLIC** repo -> secrets/`.env`/keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
Gitignore Last Verified: 2026-06-24

## Search

Local search via `@easyops-cn/docusaurus-search-local` (no Algolia account). The index is built at
compile time — **search only works against a real build** (`yarn build && yarn serve`), never `yarn start`.

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
