# GitHub repository and Pages setup

Repository: `git@github.com:verusvibe/uatpocket-site.git`.
Expected project URL after deployment: `https://verusvibe.github.io/uatpocket-site/`.

## Push the prepared source

From the `Web` directory:

```sh
git push -u origin main
```

The source repository includes the optimized assets required for a clean checkout. It excludes dependencies, generated builds, private environment files, browser output and local verification artifacts. Image regeneration is optional and needs the original iOS assets; `npm ci` and builds do not need the iOS repository.

If the remote already has commits, fetch and integrate that history before pushing. Never force-push to replace remote content.

## Enable GitHub Pages

1. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build/deployment source.
2. Under **Settings → Secrets and variables → Actions → Variables**, add the `NEXT_PUBLIC_*` launch values from `.env.example`. These are public site content, not secrets. Set `NEXT_PUBLIC_SUPPORT_PHONE` to `none` if telephone support is not offered. `NEXT_PUBLIC_COPYRIGHT_YEAR` is optional.
3. The deployment reads `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` from GitHub's Pages configuration automatically. Do not add `/uatpocket-site` to the origin manually. A custom domain configured in Pages is supported by the same workflow.
4. Review the final privacy content and configure actual delivery endpoints. Both endpoints must support the site's origin in CORS and return success only after accepting delivery.
5. Check that **Website checks** passes on `main`.
6. Open **Actions → Deploy GitHub Pages → Run workflow**, selecting `main`.

Publishing is manual. Ordinary pushes and pull requests run checks but do not deploy. The deployment uses `npm run build`, which rejects missing legal/contact/policy values and endpoints. It never substitutes the permissive local preview build. No personal access token is required: deployment uses GitHub's workflow token and Pages environment.

## Test the repository path locally

```sh
npm ci
NEXT_PUBLIC_BASE_PATH=/uatpocket-site npm run build:preview
NEXT_PUBLIC_BASE_PATH=/uatpocket-site npm run preview
```

Open `http://127.0.0.1:3000/uatpocket-site/`. In another terminal:

```sh
npx playwright install chromium webkit
NEXT_PUBLIC_BASE_PATH=/uatpocket-site npm test
npm run test:config
```

Without `NEXT_PUBLIC_SITE_URL`, preview output remains non-indexable. Test builds are not uploaded by CI. For root-hosted local development, leave `NEXT_PUBLIC_BASE_PATH` empty and run `npm run dev`.

## Workflow behavior

- `ci.yml`: installs the lockfile, checks lint/types/launch validation, builds at `/uatpocket-site`, and tests all four pages, responsive layouts, links, image loading, metadata, menu/forms and printing.
- `deploy-pages.yml`: reads Pages origin/base path, validates owner configuration, builds and uploads only `out/`, then deploys using the `github-pages` environment.
- `public/.nojekyll`: preserved in the export for static hosting compatibility.

GitHub Pages does not run the form backend or the local preview server. The repository-path `robots.txt` cannot control the entire `github.io` origin; page-level robots metadata controls preview indexing, and the exported sitemap can be submitted directly after launch.
