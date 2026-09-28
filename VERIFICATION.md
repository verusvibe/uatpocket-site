# Verification — 26 September 2026

- Next.js optimized static export: passed (`npm run build:preview`). All four requested routes generated.
- ESLint and TypeScript: passed.
- Playwright: 25 tests passed. All routes checked at 320, 390, 768, 1024 and 1440px with no page overflow or axe WCAG 2.2 AA violations.
- Menu focus / Escape, early-access validation and truthful undelivered state, support filtering, support validation, and internal links/assets: passed.
- All six original screenshot assets have local WebP variants and PNG fallbacks; source files were not changed. Screenshots load, retain their aspect ratios, and have useful alt text.
- Visually inspected home, product, privacy and support at mobile, tablet and desktop sizes. Inspected homepage story sections and the final hero composition.
- Product print output: one page each on A4 and Letter; rendered and visually inspected both. Navigation and print controls are omitted, with no clipped content.
- Lighthouse mobile audit of the optimized local export with gzip: Performance **97**, Accessibility **100**, Best Practices **100**, SEO **69**. SEO is intentionally reduced because the local preview blocks indexing (`noindex`, disallow-all robots) until a real production origin is configured. Production-domain SEO remains to be verified after owner configuration.
- Dependency audit after installation and patches: zero reported vulnerabilities.
- `npm run build`: deliberately fails with an explicit list of unresolved owner-supplied fields, as required by the prompt. The optimized preview compilation passes separately.

## Remaining launch work

Complete the public configuration in `.env.local` using `.env.example`; review and approve the privacy-policy content; configure and test real form delivery endpoints; run `npm run build`; deploy the approved export with text compression and hashed-asset caching; verify metadata, delivery and SEO on the real origin. No request was sent to an external form service, and the site was not published.

Browser screenshots/PDFs are generated under ignored `test-results/`. The UI test PDFs are verification artifacts; `/product` is the user-facing printable document. Automated checks do not claim exhaustive WCAG conformance or real-device/assistive-technology coverage.

## GitHub Pages preparation

- Initialized a standalone repository on `main`, with `origin` set to `git@github.com:verusvibe/uatpocket-site.git`. The remote was reachable and empty when checked.
- Added separate CI and manual GitHub Pages deployment workflows. Only the guarded production build can be uploaded for deployment.
- Verified an optimized export with origin `https://verusvibe.github.io` and base path `/uatpocket-site`.
- All 26 browser tests passed at the repository subpath, including all route layouts, local links and images, and canonical/Open Graph URLs.
- Three launch-configuration tests passed, including rejection of missing owner fields and acceptance of `none` or a real support phone number.
- Lint and type checks passed; type generation now runs before TypeScript to support fresh clones.
- Dependencies, build output, local environment files, screenshots/PDF test results and temporary verification files are excluded from Git.
- Nothing has been pushed or published. GitHub Pages settings, repository variables and approved legal content remain launch prerequisites; see `.github/README.md`.

## Mobile navigation fix — 27 September 2026

Reproduced failed Privacy, Support and One-Pager taps on the live site in mobile WebKit. A null-related-target blur hid the menu before click, redirecting the click to the body. Kept the menu open for that event; outside pointer events still dismiss it, and keyboard focus transitions and Escape retain their behavior. All 36 browser tests pass, including Chromium/WebKit touch navigation, section links and outside dismissal. Lint, type checking and optimized compilation pass. The fix is local and has not been pushed or deployed.
