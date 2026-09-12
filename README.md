# ClearHire Docs

Public documentation site for **ClearHire** — career tools, a resume builder and verified
employment history, in one place. Built with [Docusaurus](https://docusaurus.io) and hosted on
**GitHub Pages only** (the fleet rule for docs sites — never Firebase).

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

**GitHub Pages**, and nothing else: `.github/workflows/deploy-pages.yml` builds and publishes on every push
to `main`. The custom domain `clearhire-docs.aoneahsan.com` is set via `static/CNAME`; DNS and the Pages
setting are done (the site serves over HTTPS from GitHub). There is no Firebase target and no deploy
script — a push to `main` is the deploy.

## Structure

```
docs/                  # Markdown content (intro, getting-started, features, guides, faq, privacy, changelog)
src/css/custom.css     # ClearHire brand palette (Sky #0EA5E9 + Green #22C55E)
src/pages/index.tsx    # Landing page
static/                # robots.txt, llms.txt, brand SVGs, CNAME, .well-known/security.txt, the IndexNow key file
src/plugins/           # discoveryFeed — emits /feed.xml from the pages' dates on every build
docusaurus.config.ts   # Site config + JSON-LD (WebSite, Organization, SoftwareApplication)
sidebars.ts            # Sidebar layout
docs/tracking/clearhire-docs-content-tracker.json  # resumable enrichment backlog (excluded from the build)
```

**Last Updated:** 2026-09-12

## License

MIT © Ahsan Mahmood.
