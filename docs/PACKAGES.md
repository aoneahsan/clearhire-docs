# Package baseline

**Verified:** 2026-11-16 (Node 26.13.1 LTS pass) · earlier 2026-10-21

Fixed-path fleet record (moved here from the repo root on 2026-11-16). It is excluded from the published site
(`docusaurus.config.ts` → docs `exclude`).

- Runtime: Node 26.13.1 LTS (`.nvmrc`, `engines.node >=26.13.1`) and Yarn 4.18.1.
- Site: Docusaurus 3.10.2 with the v4 and faster future flags enabled.
- UI: React and React DOM 19.3.1.
- Search: `@easyops-cn/docusaurus-search-local` 0.55.3.
- TypeScript: `~7.0.2`. The site runs no `typescript-eslint` and no Capacitor CLI, the two tools that hold the rest
  of the fleet on 6.0, and `yarn typecheck` passes on 7 (see `../VERSION-BLOCKERS.md`).
- `build` runs with `NODE_OPTIONS=--no-experimental-webstorage`: Docusaurus' SSG touches Node 26's disabled
  `localStorage` and prints an ExperimentalWarning. Upstream has no option; re-check on each Docusaurus minor and
  remove the flag when a build without it prints nothing.

Use `yarn deps:outdated` to check the supported baseline. The required local gate is `yarn gates`.

## History

- 2026-11-16 — `.nvmrc` 24.13.0 → 26.13.1, `engines.node` `>=24.13.0` → `>=26.13.1`; every package was already on
  its latest stable. `deps:outdated` / `deps:update` no longer reject `typescript`, since the site is on 7.
