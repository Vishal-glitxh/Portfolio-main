# Build, verification, and hosting

Use Node 24 (`nvm use`) and `npm ci`.

- `npm run lint` checks source and test code.
- `npm run test:unit` verifies project-data joins, rendered citation destinations, model decryption, and required assets.
- `npm run build` checks TypeScript and creates `dist/`.
- `npx playwright install chromium webkit`, then `npm run test:e2e`, checks the production preview in a browser, including failed model/module requests, unavailable WebGL, and responsive remounts.
- `npm audit` checks the locked dependency tree.

`.github/workflows/ci.yml` runs checks on pushes and pull requests and uploads the verified distribution. No run is claimed until the workflow actually executes on GitHub. Require the `verify` check in branch protection if merges should be gated.

## Vercel hosting

The live production URL is https://vishalsuhas-dev.vercel.app/ (confirmed HTTP 200 on 2026-11-03). The model asset also returned 200. The live HTML still pointed to the old custom domain and the favicon and Draco wrapper returned 404; the local fixes have not been published.

`vercel.json` selects Vite, installs locked dependencies, runs lint and unit tests before the production build, and publishes `dist/`. Hashed assets are immutable and HTML is revalidated. The portfolio uses hash anchors, so no catch-all rewrite is needed; missing assets should return 404.

The local Vercel CLI reported an invalid token. Project IDs, Git integration, deployment history, and branch protection have not been verified. The public URL does not identify the account or immutable project ID. No deployment or DNS changes were made.

### Release options

If the existing Vercel project is already connected to this GitHub repository, confirm its repository, production branch (`main`), root directory, and Node 24 settings in the Vercel dashboard. Vercel can use `vercel.json` on its next Git deployment. GitHub CI remains a separate check; require its `verify` job before merging. The Vercel build command also enforces lint and unit tests, but does not run browser tests.

An alternative manual GitHub release workflow is provided in `.github/workflows/deploy.yml`:

1. In GitHub, configure a `production` environment restricted to `main`.
2. Set environment variables `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to the IDs of the existing project. Set the `VERCEL_TOKEN` environment secret to a token with access to that project; do not put credentials in the repository or chat.
3. Trigger **Deploy Vercel Production** from `main`. It repeats lint, unit checks, build, dependency audit, and browser checks before deploying source to that existing project, then verifies the public site and static assets.
4. Use one release path to avoid duplicate deployments. If using this workflow as the production release gate, configure Vercel's Git integration accordingly in the dashboard.

Run `npm run check:site` after release; it defaults to the confirmed production URL. The check intentionally fails against the currently deployed older build until the repaired assets are published. The workflow reports a failed health check but does not automatically roll back.

For rollback, inspect the actual Vercel deployment history and select a verified prior production deployment. Do not treat the portfolio's illustrative pipeline data as release evidence. Firebase configuration from the initial audit was removed because the user confirmed Vercel hosting. No custom-domain DNS change is needed for the supplied `vercel.app` URL.

No resume file was supplied. Resume actions open an email request instead of pretending to download a document. Replace them with a verified resume URL when one is available.

## Dependency compatibility

The lockfile uses current Vite and ESLint releases. A scoped npm override upgrades transitive minimatch 10 to patched minimatch 11; lint, data tests, and the production build must pass when changing this override. Remove it when upstream dependencies adopt the patched major. The Three.js bundle uses source modules and strict execution ordering when splitting chunks to preserve class initialization order.

## Mobile experience

Phones, touch devices, and visitors requesting reduced motion use the lightweight layout. Content opens without a full-screen loader, automatic 3D downloads, custom cursor, pinned project gallery, or smooth-scroll interception. Project cards stack vertically; skills and service descriptions remain available.

The optional **View 3D character** button mounts the character inside the hero. Rendering is capped at device pixel ratio 1 and 30 fps on this layout, and pauses offscreen or in hidden tabs. Closing the preview releases its resources. Failed loading does not block the rest of the page.

Browser checks cover 320, 390, 768, and 844 CSS-pixel layouts in Chromium and mobile WebKit, including navigation, project dialogs, absent automatic 3D requests, and model failures. Actual phone hardware/network performance still depends on the device. These local changes require deployment before they appear at the live URL.
