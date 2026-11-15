# Incident: Landing Page Indefinitely Locked Behind Loader

## Purpose

Use this runbook when visitors to `https://vishalsuhas-dev.vercel.app` report that the loading screen does not dismiss, leaving the website permanently blocked behind the full-screen loader animation with the progress counter frozen at or below 91%.

## Impact

*   **User Impact**: Visitors cannot see or interact with any section of the portfolio (Hero, About, Tech Stack, Work, Contact, or Recruiter Panel).
*   **System Impact**: The React application is mounted, but the top-level `<Loading>` component rendered by `<LoadingProvider>` never receives `isLoading = false`.
*   **Scope**: All users or users on specific browsers/networks (e.g., non-secure HTTP, restricted corporate networks blocking WebAssembly or large binary fetches).

## Symptoms

*   **Visual**: The progress bar reaches ~91% and permanently halts. The text "Loading" remains on screen indefinitely.
*   **Browser Console Errors**:
    *   `TypeError: Cannot read properties of undefined (reading 'digest')` (indicates `crypto.subtle` is unavailable due to insecure HTTP context).
    *   `GET https://.../models/character.enc 404 (Not Found)` or network timeout.
    *   `GET https://.../draco/draco_decoder.wasm 404 (Not Found)`.
    *   `Error loading GLTF model:` in console from `src/components/Character/utils/character.ts`.
*   **Network Tab**: `/models/character.enc` (2.3 MB) or `/draco/draco_decoder.wasm` failed to download, returned HTTP 4xx/5xx, or stalled.

## Severity

**P1 — High**

The entire landing page interface is rendered inaccessible to end users.

## Immediate Actions

*SAFE TO INSPECT*

1.  Open the browser Developer Tools (`F12` or `Cmd+Opt+I`) on `https://vishalsuhas-dev.vercel.app`.
2.  Inspect the **Console** tab for unhandled Promise rejections originating from `character.ts` or `Scene.tsx`.
3.  Inspect the **Network** tab, filter by `character.enc` and `draco_decoder.wasm`, and verify HTTP status codes and response headers.
4.  Verify whether the browser URL starts with `https://`. (Web Crypto API `crypto.subtle` is blocked by modern browsers in non-secure HTTP contexts).

## Diagnosis

Follow this sequence from least invasive to most invasive:

### Step 1: Verify HTTPS Context (Browser Security Policy)
*SAFE TO INSPECT*
In `src/components/Character/utils/decrypt.ts`:
```typescript
const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
```
`crypto.subtle` is only available in Secure Contexts (`https://` or `localhost`). If an edge redirect failed and the user is on `http://vishalsuhas-dev.vercel.app`, `crypto.subtle` is `undefined`, causing an immediate uncaught exception.
*   **Action**: Test `curl -sI http://vishalsuhas-dev.vercel.app/`. Verify that an automatic HTTP 301/308 redirect to `https://vishalsuhas-dev.vercel.app/` is returned.

### Step 2: Verify Static Asset Accessibility
*SAFE TO INSPECT*
The character loader in `src/components/Character/utils/character.ts` requests:
1.  `/models/character.enc` (2.3 MB binary encrypted model)
2.  `/draco/draco_decoder.wasm` (Draco decoder binary)
3.  `/draco/draco_decoder.js` (Draco decoder wrapper)

Run the following read-only checks from the terminal:
```bash
# Check character encrypted payload availability
curl -sI https://vishalsuhas-dev.vercel.app/models/character.enc

# Check Draco WebAssembly decoder availability
curl -sI https://vishalsuhas-dev.vercel.app/draco/draco_decoder.wasm
```
*Expected Result*: HTTP `200 OK` with appropriate `content-length` (> 2,000,000 bytes for `character.enc`). If HTTP 404 or 403 is returned, the hosting deployment is missing static assets from `public/`.

### Step 3: Check Code Path Execution in `setProgress.ts` and `Scene.tsx`
*SAFE TO INSPECT*
In `src/components/utils/setProgress.ts`:
*   The initial interval increments `percent` up to 91% and then waits for `progress.loaded()` to be called.
*   In `src/components/Character/Scene.tsx`:
```typescript
loadCharacter().then((gltf) => {
  if (gltf) {
    ...
    progress.loaded().then(() => {
      ...
    });
  }
});
```
*Notice*: There is no `.catch()` handler on `loadCharacter()`. If `loadCharacter()` rejects (due to network failure, corrupted model, or Draco failure), `progress.loaded()` is never triggered, trapping the user at 91%.

## Recovery

### If the cause is missing static assets on the hosting target:
*REQUIRES HUMAN APPROVAL*
1.  Verify local project build produces the required files:
    ```bash
    npm run build
    ```
2.  Verify that `dist/models/character.enc` and `dist/draco/draco_decoder.wasm` exist in the build output.
3.  Redeploy the static build to the hosting provider (e.g., `# Run the configured Deploy Vercel Production GitHub workflow; see docs/Deployment.md` or verified hosting deployment mechanism).

### If the cause is an insecure HTTP redirect loop or broken SSL certificate:
*REQUIRES HUMAN APPROVAL*
1.  Check the domain DNS and SSL certificate status at the hosting/CDN provider.
2.  Enforce automatic HTTPS redirection at the CDN edge to guarantee a secure context for `crypto.subtle`.

### If the cause is client-side WebGL / WebAssembly failure on low-end devices:
*REQUIRES HUMAN APPROVAL (Code Modification)*
1.  In `src/components/Character/Scene.tsx`, ensure `loadCharacter()` implements a `.catch()` block that calls `progress.clear()` or `setIsLoading(false)` to gracefully dismiss the loader even if 3D character initialization fails.

## Validation

1.  Open an incognito browser session and navigate to `https://vishalsuhas-dev.vercel.app`.
2.  Observe the progress counter: it should transition through 0% -> 91% -> 100%, followed by smooth unmounting of `<Loading>` and presentation of `<MainContainer>`.
3.  Check browser console: verify zero unhandled Promise rejections and verify Three.js scene successfully initializes.

## Rollback

If a recent deployment broke asset paths or introduced corrupted model files:
*   Re-deploy the previous known stable release bundle using the hosting provider's release rollback mechanism (e.g., Vercel dashboard rollback or a verified Vercel deployment rollback).
*   Verify live site immediately with:
    ```bash
    curl -sI https://vishalsuhas-dev.vercel.app/models/character.enc
    ```

## Escalation

Escalate to the core developer/maintainer if:
*   The encrypted model `public/models/character.enc` is corrupted in Git LFS or source control.
*   The hosting provider or CDN edge is returning persistent 5xx errors for static assets.
*   Browser cryptographic policies change for the domain.

## Do Not

*   **DO NOT** force-refresh or spam deployments without checking local build integrity in `dist/`.
*   **DO NOT** delete or rename `public/models/character.enc` or `public/draco/` without updating `character.ts`.
*   **DO NOT** disable HTTPS on the production domain, as Web Crypto (`crypto.subtle`) strictly requires a Secure Context.

## Root Cause Follow-Up

1.  Add an explicit `.catch()` error handler to `loadCharacter()` in `src/components/Character/Scene.tsx` so that any 3D asset failure gracefully calls `progress.loaded()` or unlocks the page.
2.  Add an automated health check step in deployment verification that asserts HTTP 200 on `/models/character.enc` and `/draco/draco_decoder.wasm`.
