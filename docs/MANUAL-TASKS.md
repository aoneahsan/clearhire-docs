# Manual / User-Only Tasks — Clearhire Docs

> The ONE place for everything only you (the human) can do. Fixed path: `docs/MANUAL-TASKS.md`.
> Global spec: `~/.claude/rules/manual-tasks.md`. Excluded from the published site (see
> `docusaurus.config.ts` → `docs.exclude`) because this repo is public.
> Last updated: 2026-09-05 (re-annotated at the DOC pass: both rows are DONE IN FACT and re-probed today — the site serves over HTTPS from GitHub Pages on the custom domain. 🔴 Only you tick them; the agent never does.)

## ⏳ Pending manual tasks

| # | Task | Why only you | Status |
|---|------|--------------|--------|
| 1 | **Add DNS.** In Hostinger, add a `CNAME` record `clearhire-docs` → `aoneahsan.github.io` on `aoneahsan.com`. | Only you control the `aoneahsan.com` DNS zone. | ☐ **Re-verified 2026-09-05** (`curl -sI https://clearhire-docs.aoneahsan.com` → `HTTP/2 200`, `server: GitHub.com`) — done in fact for two days running; tick it |
| 2 | **Configure GitHub Pages.** Repo **Settings → Pages**: source = **GitHub Actions**, custom domain = `clearhire-docs.aoneahsan.com`, then **Enforce HTTPS** once the certificate provisions. | Repo settings are owner-only. | ☐ **Re-verified over HTTPS 2026-09-05** — the certificate is live and the workflow publishes on every push to `main`; tick it |

`static/CNAME` already ships `clearhire-docs.aoneahsan.com` inside `build/`, and `.github/workflows/deploy-pages.yml` builds and
publishes on every push to `main` — these steps are all that remain.

## ✅ Completed manual tasks

| # | Task | Resolution | Date |
|---|------|-----------|------|
| — | — | — | — |
