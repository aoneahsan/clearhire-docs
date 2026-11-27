# Search console fix log: ClearHire docs (`clearhire-docs.aoneahsan.com`)

Newest entry first. One section per issue. `live-verified` is ours; `indexed` belongs to Google. This folder is
excluded from the published site (`docusaurus.config.ts:202`).

## clearhire-docs#1 — [SEO][URGENT][PENDING] URL-level indexing + AEO fix list · 2026-11-27 · commit `<pending>`

Status: partly done (config and build fixed and contract-tested in `build/`; deploy, live proof and IndexNow pending in
the main session)

| Box | SA | What was wrong (evidence) | Root fix (file:line) | Contract test | Live proof (command → result) |
|---|---|---|---|---|---|
| Owner law · one slash form | SA-P26 | `trailingSlash: false` wrote `page.html`; GitHub Pages 404s `/page/` | `docusaurus.config.ts:144` (`trailingSlash: true`); sitemap listing dates in the slashed form `:252`, `:262`; `static/llms.txt` links slashed | `src/seo/buildContract.test.ts` "slashed form, each one a built page", "no page.html", "llms.txt" | pending deploy: `curl -sI https://clearhire-docs.aoneahsan.com/faq` → 301 to `/faq/`; `/faq/` → 200 |
| 1 · home not indexed | SA-P32 | home copy is generic feature cards | Pending content (see below); links in already exist: app footer "Docs" (do-follow), docs home → app, Google Play, aoneahsan.com | one self-canonical, no noindex | — |
| 2 · 34 compare pages | SA-P32 | each page already carries the rival's dated prices, a migration path, what you give up and nofollow source links | no change (owner law: stay indexed and submitted) | canonical + no noindex on all | — |
| 3 · 3 white-label pages | SA-P32 | audit asked for noindex | overruled (below) | no noindex | — |
| 4 · feeds / `.md` mirrors | SA-P33 | the build has no `.md` mirror; `feed.xml` as "crawled, not indexed" is expected | none needed (GitHub Pages cannot send headers in any case) | — | — |
| 5 · 26 content pages | SA-P32 | Google quality signal | Pending content batch; the slash change gives each page one URL form | one self-canonical each | — |
| 6 · AEO: FAQ without FAQPage | SA-P30 | `/faq` shows 16 questions, no FAQPage JSON-LD | `src/plugins/faqSchema.ts:43-58` reads every `<h3>` question and its answer off the BUILT page and writes the JSON-LD into its head at `:61`; registered `docusaurus.config.ts:281` | "marks up the FAQ page with exactly the questions and answers it shows" | pending: `curl -s https://clearhire-docs.aoneahsan.com/faq/ \| grep -o '"@type":"FAQPage"'` |
| Owner law · no tag pages | SA-P32 | none were ever generated (no `tags:` front matter in the repo's history; none in the console lists) | `docusaurus.config.ts:211-212` (`tags: false`, inline tags fail the build) | "publishes no generated tag pages" | — |
| Owner law · broken links fail | SA-P26 | already `onBrokenLinks: 'throw'` | unchanged | config test | — |

Overruled by owner law (2026-11-27):
- Box 3 (noindex the white-label pages, drop from sitemap) → kept indexable and submitted; the link law forbids
  noindex on a public page.
- Box 2 (cut or 301 compare stubs) → kept; every page already carries verified, dated specifics and 10+ rivals stay.
- Box 4 (`X-Robots-Tag: noindex` on `.md` mirrors) → no mirror exists; the owner's form is a canonical header, never
  noindex.
- `/docs/tags/*` redirects → not applicable: this site never had a `/docs/` route base or a tag page.

### Pending

| Box | Why not done | Who | Next action |
|---|---|---|---|
| 1 · home copy | new above-the-fold words need the Story Bible voice and the owner's go-ahead on the content batch | owner, then agent | confirm the batch plan |
| 5 · 26 pages' unique angle | content batch | owner, then agent | same |
| Compare facts | last checked 2026-11-07, past the 14-day refresh | agent (`/comparison-hub`) | refresh from each rival's own pages |
| Ten locales | the site ships `en` only; this fix added no reader-facing string | owner (`/languages` run) | — |
| Sitemap resubmission | every URL moved to the slashed form | owner (GSC, Bing) + main session (IndexNow) | resubmit `sitemap.xml` after deploy |
| Deploy, live proof, IndexNow | main session owns git and deploy | main session | build → GitHub Pages → retest below |

### Retest

```bash
D=https://clearhire-docs.aoneahsan.com
curl -sI $D/faq | grep -iE '^HTTP|^location'                         # 301 → /faq/
curl -s -o /dev/null -w '%{http_code}\n' $D/faq/                     # 200
curl -s $D/faq/ | grep -o '"@type":"FAQPage"'                        # present
curl -s $D/faq/ | grep -o 'rel=canonical href=[^ >]*'               # …/faq/
curl -s $D/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | grep -vc '/</loc>'   # 0
for u in $(curl -s $D/sitemap.xml | grep -oE '<loc>[^<]+' | sed 's/<loc>//' | head -20); do
  echo "$u $(curl -s -o /dev/null -w '%{http_code}' $u) ${u%/} $(curl -s -o /dev/null -w '%{http_code}' ${u%/})"; done  # 200 / 301
yarn build && yarn seo:contract                                     # all passed
```
