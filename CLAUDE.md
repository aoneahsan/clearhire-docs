# CLAUDE.md — clearhire-docs

Public Docusaurus documentation site for the **ClearHire** app.

**Mirror of `AGENTS.md`** — byte-identical except this line. Update one, update the other.

| Context Budget Last Verified | 2026-08-17 — CLAUDE.md 6,269 B / no PENDING-TASKS.md; re-check due 2026-08-27 |
|---|---|

> Global + workspace rules auto-load every session (`~/.claude/rules/*.md`,
> `~/Documents/ahsan-work/code/CLAUDE.md`). This file is **project-specific only** — it never restates a
> global rule.

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
| Baseline | 23 pages covering every shipped feature |

## 🔴 Verified product facts (2026-07-21) — do not regress these

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

## Critical rules

| Rule | Detail |
|---|---|
| PUBLIC repo — no secrets | This repo is PUBLIC. NEVER commit real env/keys. Only `.env.example` if needed; `.env` stays git-ignored. |
| Honest framing | Document only real, shipped features. No fabricated stats. Verification proves the working relationship, not job performance. No "free/best/#1/top" as selling adjectives — state pricing factually instead. |
| Single source of truth | Every product fact comes from the ClearHire app code / README. Don't invent features or screens. |
| SEO floor | Every page: unique title (50-60 chars) + description (140-160), definition-first intro, 3-6 H2 sections, FAQ on feature/guide pages, author credit on longer pages. |
| One commit per batch | Docs enrichment is committed one batch at a time. |
| No dev servers in agent runs | The agent runs `yarn build` / `yarn typecheck` only; the user runs `yarn start`. |

## Hard checks before editing

1. Is the product fact you're writing backed by the ClearHire app code / README? If unsure, verify first.
2. Does the page hit the SEO floor (unique title 50-60 / description 140-160, definition-first intro,
   3-6 H2s, FAQ on feature/guide pages, author credit)?
3. Are slugs consistent with `sidebars.ts` and `routeBasePath: '/'` (config uses `onBrokenLinks: 'throw'`)?

## Verification

```bash
yarn typecheck   # tsc --noEmit (exit 0)
yarn build       # docusaurus build → ./build (exit 0)
```

## Search

Local search via `@easyops-cn/docusaurus-search-local` (no Algolia account). The index is built at
compile time — **search only works against a real build** (`yarn build && yarn serve`), never `yarn start`.

## Content tracker

Resumable enrichment backlog: `docs/tracking/clearhire-docs-content-tracker.json`. The 23-page baseline is
complete; deep-enrichment batches are listed there.

## Manual / user-only tasks (deploy)

Firebase Hosting site creation + `firebase deploy`, enabling GitHub Pages, and DNS for
`clearhire-docs.aoneahsan.com` are owner-only — tracked in the app repo's
`clearhire/docs/MANUAL-TASKS.md`.

## Gitignore

`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build, `dist`,
`www`, `node_modules`, logs, caches, IDE), never lose source. Custom rules always present: `*.ignore.*`,
`project-record-ignore/`. This is a **PUBLIC** repo → secrets, `.env` and keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
`Gitignore Last Verified: 2026-06-24`

## Last Updated

2026-08-17 — context pass. Two fleet-copied blocks were removed as **superseded global law**, not as project
knowledge: `## Sub-agents & Skills — Main-Context-First` and `<!-- RULE:main-context-model-workflow
v2026-07-16 -->` (owner directives 2026-07-11 / 2026-07-14, fleet-rolled 2026-07-16). They allowed a default
`general-purpose` / `Explore` / `Plan` / `fork` agent for read-only, no-skill exploration and named Opus 4.8
as the execution model. Current law bans **every** default sub-agent including read-only exploration, and
lives in `~/.claude/rules/subagent-orchestration.md` + `skill-bindings.md`, which auto-load — so a copy here
could only drift. Multi-phase work still keeps `docs/features/<slug>/00-tracker.json`; plans live in
`~/.claude/plans/`; the global records are in the `ahsan-notebook` repo under `static/assets/claude-code/`,
which the `~/.claude/…` paths symlink into. The `CLAUDE.md`/`AGENTS.md` pair was also re-merged, since each
side carried sections the other lacked.

2026-07-21 — accuracy pass vs the app: sign-in Google-only, iOS/extension claims corrected, version claims
fixed, payment links parameterised, local search added, broken-link/anchor checks set to `throw`.
