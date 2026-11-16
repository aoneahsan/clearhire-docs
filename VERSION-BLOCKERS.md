# Version blockers

**Reviewed:** 2026-11-16

## TypeScript 7

Adopted (`~7.0.2`). `yarn typecheck` passes on it, and the site has neither `typescript-eslint` nor the Capacitor CLI,
the tools that hold the rest of the fleet on 6.0. The update scripts no longer reject `typescript` (2026-11-16).

## Dependency audit

After the 2026-10-21 lockfile refresh, `yarn npm audit --recursive --all` reports 90 transitive findings: 5 critical, 39 high, 35 moderate, and 11 low. The affected package names are:

`baseline-browser-mapping`, `body-parser`, `brace-expansion`, `braces`, `browserslist`, `colord`, `compression`, `dompurify`, `fast-uri`, `follow-redirects`, `http-cache-semantics`, `image-size`, `joi`, `js-yaml`, `katex`, `mermaid`, `nanoid`, `postcss`, `postcss-selector-parser`, `proxy-addr`, `qs`, `serialize-javascript`, `shell-quote`, `source-map-js`, `svgo`, `tar`, `tinypool`, `undici`, `uuid`, `webpack-dev-server`, and `whatwg-encoding`.

The site already uses the latest direct dependency releases. These findings are build or documentation stack transitives without a supported direct upgrade in this repository. Recheck on every Docusaurus and local-search release; remove each record when the refreshed dependency tree clears it.

The install also reports peer notices inside the transitive Algolia autocomplete packages bundled by the local search stack. ClearHire does not configure Algolia. The production build completes with the supported local search configuration, so these remain upstream notices.
