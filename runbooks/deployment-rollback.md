# Incident: Static Hosting Release Rollback & Live Site Incident

## Purpose

Use this runbook when an updated production release on `https://vishalsuhas-dev.vercel.app` introduces critical visual regressions, application crashes, broken navigation, or missing assets, and immediate reversal to the previous known good release is required.

## Impact

*   **User Impact**: Visitors to the portfolio experience critical site degradation, blank screens, visual layout breakage, or non-functional project case study modals.
*   **Business Impact**: Professional credentials, resume access, and project demonstrations are impaired for visiting recruiters and collaborators.
*   **Scope**: Global traffic to `https://vishalsuhas-dev.vercel.app`.

## Symptoms

*   **HTTP Status**: HTTP 5xx errors from the CDN/hosting edge, or HTTP 404 on `index.html`.
*   **Runtime Symptoms**:
    *   Uncaught runtime exceptions immediately following a fresh deployment.
    *   Missing navigation elements or broken styling layouts.
    *   Full-page blank screen on initial load.
*   **Deployment Logs**: Deployment CLI exited with an error or reported partial file upload completion.

## Severity

**P1 — High** (or **P0** if complete domain outage occurs)

Live production website is degraded or non-functional for all visiting traffic.

## Immediate Actions

*SAFE TO INSPECT*

1.  Verify the live site status from the command line:
    ```bash
    curl -sI https://vishalsuhas-dev.vercel.app/
    ```
    Confirm whether HTTP `200 OK` is returned and inspect response headers (e.g., `server`, `cache-control`).
2.  Inspect the live page content:
    ```bash
    curl -s https://vishalsuhas-dev.vercel.app/ | head -n 20
    ```
    Confirm that the HTML contains expected `<div id="root"></div>` and standard script tags.
3.  Inspect Git history to identify the latest commit deployed:
    ```bash
    git log -n 5 --oneline
    ```

## Diagnosis

### Step 1: Identify Deployment Failure Mode
*SAFE TO INSPECT*
Determine which condition is causing the live failure:
*   **Condition A: Incomplete Asset Upload**: `index.html` was updated on the static host, but some `.js` or `.css` chunks failed to upload, resulting in 404s for critical bundles.
*   **Condition B: Broken Code in Production**: All files uploaded cleanly, but a logic bug or unhandled edge case throws an error during React mounting (`main.tsx` or `App.tsx`).
*   **Condition C: Stale Domain / DNS Routing**: Domain pointing to outdated hosting target or SSL certificate expired.

### Step 2: Compare Local Production Build vs Live Site
*SAFE TO INSPECT*
1.  Verify if the local build works cleanly in preview mode:
    ```bash
    npm run build
    npm run preview
    ```
2.  Open `http://localhost:4173/` in a browser.
3.  If local preview works but production is broken, the issue is an incomplete hosting deployment or CDN caching issue.
4.  If local preview reproduces the failure, the issue is committed application code in the current Git ref.

## Recovery

Follow the appropriate recovery path based on whether the rollback is performed at the hosting level or the Git level:

### Method 1: Instant Hosting Release Rollback (Vercel / CDN)
*REQUIRES HUMAN APPROVAL*
*Verification*: Portfolio pipeline data is illustrative and is not evidence of an actual Hosting release. Confirm the Vercel project and release history in Vercel dashboard before attempting rollback.
1. Open the confirmed Vercel project in Vercel dashboard and navigate to **Deployments**.
2. Locate a previously verified release and use its **Rollback** action.
3. Verify the HTML, hashed assets, model download, and visible navigation after rollback. Recovery time depends on the actual hosting project and CDN state.

### Method 2: Git-Based Revert & Redeploy
*REQUIRES HUMAN APPROVAL*
If hosting release history is unavailable or the deployment was driven by a Git commit:
1.  Identify the commit hash of the previous known stable state:
    ```bash
    git log -n 5 --oneline
    ```
2.  Checkout the previous stable commit or revert the breaking commit:
    ```bash
    git revert <breaking-commit-hash>
    ```
3.  Cleanly rebuild the distribution bundle:
    ```bash
    npm run build
    ```
4.  Verify local preview:
    ```bash
    npm run preview
    ```
5.  Re-deploy the verified distribution bundle:
    ```bash
    # Run the configured Deploy Vercel Production GitHub workflow; see docs/Deployment.md
    ```

## Validation

1.  Query the live domain using curl:
    ```bash
    curl -sI https://vishalsuhas-dev.vercel.app/
    ```
    Confirm HTTP `200 OK`.
2.  Open `https://vishalsuhas-dev.vercel.app/` in an incognito browser window (to bypass local browser caches).
3.  Verify:
    *   Loading screen animates and transitions to the main landing page.
    *   3D Character in Hero section renders and tracks mouse movement.
    *   All sections (Hero, About, What I Do, Work, Career, Contact) render with correct styling.
    *   Clicking "Recruiter Mode" opens the recruiter panel cleanly.
    *   Clicking "Explore Engineering Evidence" opens the project explorer overlay.

## Rollback

This runbook documents the primary rollback mechanism. If the rollback action itself fails:
*   Re-verify the build locally (`npm run build`).
*   Deploy a minimal static fallback `index.html` while diagnosing root cause.

## Escalation

Escalate to the domain/hosting administrator if:
*   The hosting provider dashboard is unresponsive.
*   DNS records have been altered outside the hosting configuration.
*   SSL certificate renewal has failed at the registrar/CDN level.

## Do Not

*   **DO NOT** force-push or rewrite Git history on `main` during an active outage.
*   **DO NOT** modify production bundle files directly on the CDN edge without keeping Git in sync.
*   **DO NOT** deploy untested code directly to production in an attempt to "hotfix" without local `npm run build && npm run preview` verification.

## Root Cause Follow-Up

1.  Set up preview channels / staging deployments (e.g. Vercel preview deployments or PR preview deploys) to test builds before promoting them to the live production target.
2.  Add automated smoke tests that query the live URL after every deployment.
