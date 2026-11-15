# Incident: Build Pipeline Failure & Dynamic Chunk Mismatch

## Purpose

Use this runbook when:
1.  The production build command `npm run build` fails during local development or CI/CD deployment preparation.
2.  Users in production encounter runtime errors when clicking "Explore Engineering Evidence" or "Recruiter Mode" due to missing or mismatched dynamic JavaScript chunks (`ChunkLoadError`).

## Impact

*   **Build Pipeline Failure**: Prevents deployment of bug fixes, content updates, or new case studies to production.
*   **Dynamic Chunk Mismatch**: If an atomic deployment is not performed, users with cached `index.html` request outdated dynamic chunks (e.g., `dist/assets/ProjectExplorer-[hash].js`) that return HTTP 404, causing modal overlays to fail silently or crash with a React Suspense error.

## Symptoms

*   **Build Command Failure**:
    *   `npm run build` exits with non-zero exit code.
    *   TypeScript compiler output shows errors such as:
        *   `error TS2307: Cannot find module '...' or its corresponding type declarations.`
        *   `error TS2322: Type '...' is not assignable to type '...'.`
    *   Rollup bundle warning: `Some chunks are larger than 500 kB after minification.`
*   **Runtime Chunk Mismatch**:
    *   User clicks "Explore Engineering Evidence" on any project card in Work section.
    *   Browser console logs:
        *   `TypeError: Failed to fetch dynamically imported module: .../dist/assets/ProjectExplorer-tOxXg5IZ.js`
        *   `Error: Loading chunk failed.`

## Severity

**P1 — High**

Blocks production deployment release or breaks key user features (Project Explorer and Recruiter Panel).

## Immediate Actions

*SAFE TO INSPECT*

1.  Run the local build command in the project root to reproduce the exact error output:
    ```bash
    npm run build
    ```
2.  Run the linter to detect unhandled syntax, hook violations, or import errors:
    ```bash
    npm run lint
    ```
3.  If diagnosing a live production chunk mismatch, check the browser console Network tab for HTTP 404 status codes on `assets/*.js`.

## Diagnosis

### Step 1: Diagnose TypeScript Compilation Issues
*SAFE TO INSPECT*
The build script in `package.json` executes:
```bash
tsc -b && vite build
```
Notice `tsc -b` runs before Vite bundling. TypeScript compiles project references using `tsconfig.app.json` and `tsconfig.node.json`.
*   Run the compiler directly to isolate type checking from bundling:
    ```bash
    npx tsc -b --noEmit
    ```
*   Inspect which file and line number caused the type mismatch.

### Step 2: Diagnose Chunk Size and Code-Splitting Boundaries
*SAFE TO INSPECT*
In `docs/PerformanceInventory.md` and Vite build output:
*   Initial 3D bundle (`index-[hash].js`): ~597 kB (contains Three.js, R3F, GLTF loader).
*   Lazy-loaded `ProjectExplorer`: ~231 kB.
*   If new dependencies or heavy JSON datasets are imported into `MainContainer.tsx` instead of being partitioned into lazy-loaded chunks, the bundle size exceeds browser parsing budgets on mobile.

### Step 3: Diagnose CDN Cache Invalidation / Stale HTML
*SAFE TO INSPECT*
When a new production build is deployed:
1.  Vite generates content-hashed filenames for all assets in `dist/assets/` (e.g., `ProjectExplorer-tOxXg5IZ.js`).
2.  `dist/index.html` references these new hashes.
3.  If the CDN or hosting provider caches `index.html` with a long `Cache-Control` header (e.g., `max-age=86400`), client browsers will continue using the old `index.html`, which points to old hashes that may no longer exist on the origin server.

## Recovery

### If recovering from TypeScript build errors:
*SAFE AUTOMATION / CODE FIX*
1.  Identify the erroneous type assignment or missing export reported by `tsc -b`.
2.  Fix the TypeScript declaration or interface in `src/types/` or the affected component.
3.  Re-run:
    ```bash
    npm run build
    ```
    Confirm that `tsc -b && vite build` exits with code 0 and outputs the `dist/` directory.

### If recovering from runtime `ChunkLoadError` on production CDN:
*REQUIRES HUMAN APPROVAL*
1.  Ensure CDN hosting configuration sets `Cache-Control: no-cache, no-store, must-revalidate` for `index.html`.
2.  Ensure static assets in `/assets/` have immutable caching: `Cache-Control: public, max-age=31536000, immutable`.
3.  Retain the previous release's `dist/assets/` files on the hosting origin during deployments so that active sessions can fetch old chunks until reload.
4.  Purge CDN cache for `https://vishalsuhas-dev.vercel.app/index.html`.

## Validation

1.  Execute local build and preview:
    ```bash
    npm run build
    npm run preview
    ```
2.  Open `http://localhost:4173` (default Vite preview port).
3.  Click "Recruiter Mode" in the top bar: verify that `RecruiterPanel` mounts cleanly.
4.  Click "Explore Engineering Evidence" on each project card: verify that `ProjectExplorer` loads, renders datasets, and closes cleanly without console errors.

## Rollback

If a broken build was accidentally published to the live hosting provider:
*   Use the hosting provider CLI or dashboard to roll back to the previously deployed release (see [deployment-rollback.md](deployment-rollback.md)).
*   No git revert is required immediately if the previous hosting release package is redeployed.

## Escalation

Escalate to the repository owner if:
*   A major dependency upgrade in `package.json` breaks peer dependency resolution or introduces compiler incompatibility.
*   The hosting provider CDN rejects asset upload due to bundle quota limits.

## Do Not

*   **DO NOT** use `// @ts-ignore` or `any` to blindly suppress TypeScript compiler errors without understanding type safety implications.
*   **DO NOT** disable `tsc -b` in the `build` script to force an invalid build into production.
*   **DO NOT** delete the `dist/assets/` of the preceding version until all client sessions have refreshed.

## Root Cause Follow-Up

1.  Wrap dynamic `React.lazy` imports in a lightweight error boundary with a retry button to gracefully handle network-induced `ChunkLoadError`s.
2.  Add a pre-commit or CI workflow that enforces `npm run lint && npm run build` before merging PRs to `main`.
