# Build, verification, and hosting

Use Node 24 (`nvm use`) and `npm ci`.

- `npm run lint` checks source and test code.
- `npm run test:unit` verifies project-data joins, rendered citation destinations, model decryption, and required assets.
- `npm run build` checks TypeScript and creates `dist/`.
- `npx playwright install chromium webkit`, then `npm run test:e2e`, checks the production preview in a browser, including failed model/module requests, unavailable WebGL, and responsive remounts.
- `npm audit` checks the locked dependency tree.

`.github/workflows/ci.yml` runs checks on pushes and pull requests and uploads the verified distribution. No run is claimed until the workflow actually executes on GitHub. Require the `verify` check in branch protection if merges should be gated.

## Vercel hosting

Release is on hold until a custom domain owned by Vishal Suhas is connected and verified in Vercel. The `vercel.app` address is a hosting address, not a custom domain. `vercel.json` disables automatic Vercel Git deployments, including previews, so source can be pushed for review without publishing it. The manual production workflow requires `CUSTOM_DOMAIN`, rejects `*.vercel.app`, and runs Vercel's domain verification command before deployment. Confirm domain ownership, DNS, HTTPS, favicon, privacy policy, terms, and removal of any host-injected AI badge in the Vercel dashboard before triggering production deployment.

The existing Vercel hosting URL is https://vishalsuhas-dev.vercel.app/. On 2026-11-25 its HTML and favicon returned HTTP 200. This local update has not been published, and this address does not satisfy the custom-domain release requirement.

`vercel.json` selects Vite, installs locked dependencies, runs lint and unit tests before the production build, and publishes `dist/`. Hashed assets are immutable and HTML is revalidated. The portfolio uses hash anchors, so no catch-all rewrite is needed; missing assets should return 404.

The local Vercel CLI reported an invalid token. Project IDs, Git integration, deployment history, and branch protection have not been verified. The public URL does not identify the account or immutable project ID. No deployment or DNS changes were made.

### Release options

If the existing Vercel project is already connected to this GitHub repository, confirm its repository, production branch (`main`), root directory, and Node 24 settings in the Vercel dashboard. GitHub CI remains a separate check; require its `verify` job before merging. The Vercel build command also enforces lint and unit tests, but does not run browser tests. Automatic Git deployment remains disabled; use the manual workflow after the release gate is satisfied.

An alternative manual GitHub release workflow is provided in `.github/workflows/deploy.yml`:

1. In GitHub, configure a `production` environment restricted to `main`.
2. Set environment variables `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to the IDs of the existing project. Set the `VERCEL_TOKEN` environment secret to a token with access to that project; do not put credentials in the repository or chat.
3. After the custom domain is connected and verified, set the `CUSTOM_DOMAIN` environment variable to its hostname and trigger **Deploy Vercel Production** from `main`. It repeats lint, unit checks, build, dependency audit, and browser checks before deploying source to that existing project, then verifies the custom domain.
4. Use one release path to avoid duplicate deployments. If using this workflow as the production release gate, configure Vercel's Git integration accordingly in the dashboard.

Run `npm run check:site` against the custom-domain URL after release. The workflow reports a failed health check but does not automatically roll back.

For rollback, inspect the actual Vercel deployment history and select a verified prior production deployment. Do not treat the portfolio's illustrative pipeline data as release evidence. Firebase configuration from the initial audit was removed because the user confirmed Vercel hosting.

The resume link serves `public/documents/vishal-suhas-cv.pdf`. Check the document's currency before release.

## Dependency compatibility

The lockfile uses current Vite and ESLint releases. A scoped npm override upgrades transitive minimatch 10 to patched minimatch 11; lint, data tests, and the production build must pass when changing this override. Remove it when upstream dependencies adopt the patched major. The Three.js bundle uses source modules and strict execution ordering when splitting chunks to preserve class initialization order.

## Mobile experience

Phones, touch devices, and visitors requesting reduced motion use the lightweight layout. Content opens without a full-screen loader, automatic 3D downloads, custom cursor, pinned project gallery, or smooth-scroll interception. Project cards stack vertically; skills and service descriptions remain available.

The optional **View 3D character** button mounts the character inside the hero. Rendering is capped at device pixel ratio 1 and 30 fps on this layout, and pauses offscreen or in hidden tabs. Closing the preview releases its resources. Failed loading does not block the rest of the page.

Browser checks cover 320, 390, 768, and 844 CSS-pixel layouts in Chromium and mobile WebKit, including navigation, project dialogs, absent automatic 3D requests, and model failures. Actual phone hardware/network performance still depends on the device. These local changes require deployment before they appear at the live URL.
