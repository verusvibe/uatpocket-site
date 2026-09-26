# UAT Pocket website

Responsive, static-exported Next.js App Router website built from `../iOS/UAT Pocket/docs/LANDING_PAGE_BUILD_PROMPT.md` and `../iOS/UAT Pocket/PROJECT_CONTEXT.md`. Routes: `/`, `/product`, `/privacy`, `/support`. The native iOS application and original screenshots are unchanged.

## Develop

Use Node.js 22+ and npm. Run `npm ci`, copy `.env.example` to `.env.local` if configuring real owner values, then `npm run dev`. Open http://127.0.0.1:3000. No database is needed.

## Build and launch

- `npm run lint` — ESLint.
- `npm run typecheck` — TypeScript.
- `npm run format` — Prettier.
- `npm run build` — validates launch configuration, then builds the production static export in `out/`.
- `npm run build:preview` — optimized production compilation with unresolved values allowed **for local review only**. This is not a publish command. The preview has `noindex` metadata and disallow-all robots when no production origin is configured.
- `npm run preview` — serve the export locally after building. Stop a running development server first.

Do not publish preview output. Production builds intentionally fail until the required operator, policy and form-delivery configuration is complete. Public deployment has not been performed. Serve each route's exported `index.html` with normal directory URLs and configure the host's 404 page using `out/404.html`. Rebuild after changing environment variables; all website configuration is embedded at build time.

## Owner-supplied configuration

All variables are documented in `.env.example`; all are public. Never place credentials or secrets in `NEXT_PUBLIC_*` variables.

Required before launch:

| Variable suffix (prefix `NEXT_PUBLIC_`) | Purpose / visible placeholder |
| --- | --- |
| `LEGAL_ENTITY` | `[LEGAL ENTITY]` |
| `COPYRIGHT_OWNER` | `[COPYRIGHT OWNER]` |
| `CONTACT_EMAIL` | Privacy `[CONTACT EMAIL]` |
| `SUPPORT_EMAIL` | `[SUPPORT EMAIL]` |
| `SECURITY_EMAIL` | `[SECURITY CONTACT EMAIL]` |
| `EFFECTIVE_DATE` | `[EFFECTIVE DATE]` |
| `RETENTION_POLICY` | Final retention periods, deletion and backup handling |
| `PROCESSING_REGIONS` | Processing locations and transfer safeguards |
| `SERVICE_PROVIDER_DETAILS` | Confirmed provider list and terms |
| `AI_PROCESSING_TERMS` | AI provider data use and retention terms |
| `LEGAL_BASES` | Applicable legal bases and user rights |
| `SITE_URL` | HTTPS production origin; drives canonical/social URLs, robots and sitemap |
| `EARLY_ACCESS_ENDPOINT` | HTTPS early-access delivery endpoint |
| `SUPPORT_ENDPOINT` | HTTPS support delivery endpoint |

Set `SUPPORT_PHONE` to a real phone number or `none` to omit telephone support. Optional: `COPYRIGHT_YEAR` (defaults to current build year). No App Store link or social-network links are invented. A real App Store URL can be added when supplied.

The privacy document remains explicitly marked as a policy draft for owner review. Review the complete policy text and remove the draft notice only after approving the actual practices. This implementation makes no certification or regulatory-compliance claims.

## Form delivery contract

Both forms validate required fields, email syntax and privacy acknowledgement, associate errors with inputs and focus the first invalid input. They preserve entries on failed delivery and prevent repeat submission while a request is pending.

Without an endpoint, the handler performs validation only, sends no network request, stores no data and explicitly reports that nothing was sent or stored. With configuration, forms POST JSON to the selected endpoint:

- Early access: `kind: "early"`, `email`, `name`, `organisation`, `role`, `message`, `privacy: "on"`.
- Support: `kind: "support"`, `name`, `email`, `topic`, `message`, `version`, `privacy: "on"`.

The endpoint must accept `Content-Type: application/json`, validate and limit the data server-side, support CORS for the site's exact origin (including OPTIONS preflight), apply abuse/rate controls and return a 2xx status **only after accepting the request for delivery**. Non-2xx responses, connection failures and a 15-second timeout show a recoverable failure. Never put an endpoint API key in the client. No live endpoint has been supplied or tested.

## Images and SEO

`node scripts/optimize-images.mjs` recreates 384/640/960px WebP variants and optimized PNG fallbacks from the six supplied App Store screenshots. Source PNGs are read only. Explicit intrinsic dimensions preserve the original ratio; below-fold images are lazy-loaded. The hero is prioritized. The icon is derived from the supplied app icon. `public/og.png` is the generated sharing card. There are no remote fonts or image requests.

Each route has title/canonical/Open Graph metadata. JSON-LD contains only product name, business-application category and verified descriptive copy; no ratings, prices or download claims. The sitemap only lists a configured production origin.

## Privacy-aware analytics

No analytics SDK, tracking cookies or form logging is enabled. If an analytics adapter is added later, use only the brief's generic event names and page/section identifiers. Do not send emails, form fields, issue/evidence content or screenshot interactions. Treat a preview validation as undelivered, never as a submitted lead.

## Verification

Install Chromium with `npx playwright install chromium`, serve the exported site, then run `npm test`. `TEST_BASE_URL` can override the default local origin. Tests cover all four routes at 320, 390, 768, 1024 and 1440px; axe WCAG 2.2 AA checks; page overflow; menu keyboard/Escape behavior; form errors and honest preview status; support search; internal links/assets; and A4/Letter PDF output. Test screenshots and PDFs are in ignored `test-results/`.

In the build environment, Chromium was installed at `/private/tmp/uat-pocket-browsers`; use `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/uat-pocket-browsers npm test` to reuse it. Automated accessibility checks supplement, and do not replace, assistive-technology testing.

Deployments should enable gzip/Brotli compression for HTML, CSS and JavaScript and immutable caching for hashed `/_next/static/` assets. The local preview script enables gzip for realistic checks.

## GitHub Pages

See [.github/README.md](.github/README.md) for the exact repository setup, push command, launch variables and manual publication steps for `verusvibe/uatpocket-site`. All internal URLs support `NEXT_PUBLIC_BASE_PATH`; root hosting remains the default for local development. The build includes the already-optimized assets, so a fresh clone does not need the iOS source directory. Optional image regeneration supports `UAT_SCREENSHOT_SOURCE` and `UAT_APP_ICON_SOURCE`.
