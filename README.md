# ClearHire Docs

Public documentation site for **ClearHire** — a resume builder and verified-employment
job platform. Built with [Docusaurus](https://docusaurus.io), dual-hosted on Firebase Hosting
and GitHub Pages.

- **App:** https://clearhire.aoneahsan.com
- **Android:** https://play.google.com/store/apps/details?id=com.aoneahsan.clearhire
- **Docs (this site):** https://clearhire-docs.aoneahsan.com
- **Author:** [Ahsan Mahmood](https://aoneahsan.com)

## Develop

```bash
yarn install
yarn start        # local dev server on http://localhost:5962
yarn build        # static build → ./build
yarn typecheck    # tsc --noEmit
```

Yarn only (`nvm → npm global → yarn local`). Never `npm`/`pnpm` for local installs.

## Deploy

This site is dual-hosted:

- **Firebase Hosting** (site `clearhire-docs`): `yarn firebase:deploy` (user-only — needs the
  Firebase project + login).
- **GitHub Pages**: the `.github/workflows/deploy-pages.yml` workflow builds and publishes on every
  push to `main`. Enable once in repo Settings → Pages → Source: GitHub Actions. Custom domain
  `clearhire-docs.aoneahsan.com` is set via `static/CNAME`.

## Structure

```
docs/                  # Markdown content (intro, getting-started, features, guides, faq, privacy, changelog)
src/css/custom.css     # ClearHire brand palette (Sky #0EA5E9 + Green #22C55E)
src/pages/index.tsx    # Landing page
static/                # robots.txt, llms.txt, brand SVGs, CNAME, .well-known/security.txt
docusaurus.config.ts   # Site config + JSON-LD (WebSite, Organization, SoftwareApplication)
sidebars.ts            # Sidebar layout
docs/tracking/clearhire-docs-content-tracker.json  # resumable enrichment backlog
```

## License

MIT © Ahsan Mahmood.
