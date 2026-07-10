# CLAUDE.md — clearhire-docs

Public Docusaurus documentation site for the **ClearHire** app.

> Global + workspace rules auto-load from `~/.claude/CLAUDE.md`, `~/.claude/rules/*.md`, and
> `/home/ahsan/Documents/01-code/CLAUDE.md`. This file is project-specific only. `CLAUDE.md` and
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
| Documents | the ClearHire app at `/home/ahsan/Documents/01-code/projects/clearhire` |
| App URL | https://clearhire.aoneahsan.com |
| Play Store | https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire |
| Dev port | 5962 (start) / 5963 (serve) |
| Build gates | `yarn typecheck` exit 0 · `yarn build` (→ `./build`) exit 0 |

## Critical rules

| Rule | Detail |
|---|---|
| PUBLIC repo — no secrets | This repo is PUBLIC. NEVER commit real env/keys. Only `.env.example` if needed; `.env` stays git-ignored. |
| Honest framing | Document only real, shipped features. iOS + the browser extension are in development / not yet published — never describe them as live. Verification proves the working relationship, not job performance. No fabricated stats. |
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

## Last Updated

2026-06-22


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)
