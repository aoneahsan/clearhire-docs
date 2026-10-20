# Version blockers

**Reviewed:** 2026-10-21

## TypeScript 7

TypeScript remains on the current 6.0 line because Docusaurus 3.10.2 has not established TypeScript 7 as its supported baseline. Both dependency update scripts reject `typescript` so a routine update cannot cross that compatibility boundary silently.

Recheck when Docusaurus documents TypeScript 7 support. Remove the rejection only after `yarn gates` passes on the new major.

## Dependency audit

After the 2026-10-21 lockfile refresh, `yarn npm audit --recursive --all` reports 90 transitive findings: 5 critical, 39 high, 35 moderate, and 11 low. The affected package names are:

`baseline-browser-mapping`, `body-parser`, `brace-expansion`, `braces`, `browserslist`, `colord`, `compression`, `dompurify`, `fast-uri`, `follow-redirects`, `http-cache-semantics`, `image-size`, `joi`, `js-yaml`, `katex`, `mermaid`, `nanoid`, `postcss`, `postcss-selector-parser`, `proxy-addr`, `qs`, `serialize-javascript`, `shell-quote`, `source-map-js`, `svgo`, `tar`, `tinypool`, `undici`, `uuid`, `webpack-dev-server`, and `whatwg-encoding`.

The site already uses the latest direct dependency releases. These findings are build or documentation stack transitives without a supported direct upgrade in this repository. Recheck on every Docusaurus and local-search release; remove each record when the refreshed dependency tree clears it.

The install also reports peer notices inside the transitive Algolia autocomplete packages bundled by the local search stack. ClearHire does not configure Algolia. The production build completes with the supported local search configuration, so these remain upstream notices.
