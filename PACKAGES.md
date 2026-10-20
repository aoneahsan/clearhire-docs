# Package baseline

**Verified:** 2026-10-21

- Runtime: Node 24.13.0 and Yarn 4.18.1.
- Site: Docusaurus 3.10.2 with the v4 and faster future flags enabled.
- UI: React and React DOM 19.3.1.
- Search: `@easyops-cn/docusaurus-search-local` 0.55.3.
- TypeScript: 6.0.3, held as described in `VERSION-BLOCKERS.md`.
- GitHub Pages workflow: checkout 7, setup-node 7, configure-pages 6, upload-pages-artifact 5, deploy-pages 5.

Use `yarn deps:outdated` to check the supported baseline. The required local gate is `yarn gates`.
