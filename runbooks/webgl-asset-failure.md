# Incident: WebGL Context Crash & 3D Avatar Rendering Failure

## Purpose

Use this runbook when visitors report that the 3D interactive avatar fails to render, renders as a black/transparent canvas, causes high GPU/CPU utilization, or crashes the browser tab with a WebGL context lost error.

## Impact

*   **User Impact**: The interactive 3D character in the Hero section is invisible or frozen. Users cannot interact with mouse-tracking bone head rotations.
*   **System Impact**: The Three.js WebGL canvas loses its GPU context or fails shader compilation. The HTML/CSS content (Hero text, About, Tech Stack, Work) remains visible and accessible.
*   **Scope**: Primarily affects low-memory mobile devices, devices with disabled hardware acceleration, or older browsers lacking WebGL 2.0 / Draco WebAssembly support.

## Symptoms

*   **Visual**: The Hero section background is empty where the 3D character normally sits. Text and navigation are fully visible.
*   **Browser Console Errors**:
    *   `THREE.WebGLRenderer: Context Lost.`
    *   `WebGL: CONTEXT_LOST_WEBGL: loseContext: context lost`
    *   `Error compiling shader` or `OutOfMemoryError`
    *   `Cannot read properties of null (reading 'scene')`
*   **Performance**: Device fan noise, dropped frames (< 15 FPS), or mobile browser reloading the page due to high memory pressure.

## Severity

**P2 — Medium**

The core textual portfolio and project case studies remain functional, but the primary 3D visual feature is degraded or absent.

## Immediate Actions

*SAFE TO INSPECT*

1.  Open the browser Developer Tools and check the **Console** tab for WebGL context lost warnings or Three.js shader compilation failures.
2.  Check the **Memory** tab or Task Manager to verify if the browser tab's memory consumption exceeds device thresholds (> 500 MB).
3.  Check `chrome://gpu` (or browser equivalent) to confirm if hardware acceleration is active or if the GPU driver crashed.

## Diagnosis

### Step 1: Check WebGL Capability & Support
*SAFE TO INSPECT*
Confirm whether the client browser supports WebGL:
*   In the browser console, evaluate:
    ```javascript
    !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('webgl2')
    ```
*   If `false`, the client does not support WebGL 2.0.

### Step 2: Inspect Asset Memory Footprint
*SAFE TO INSPECT*
In `src/components/Character/utils/character.ts` and `src/components/Character/Scene.tsx`:
*   `character.enc`: 2.33 MB encrypted binary.
*   `char_enviorment.hdr`: 295 kB HDR environment texture.
*   `renderer.compileAsync(character, camera, scene)` is executed to pre-compile all materials and shaders before adding the model to the scene.
*   On memory-constrained mobile devices, decoding Draco geometries and uploading uncompressed textures to the GPU simultaneously can trigger an immediate out-of-memory WebGL context loss.

### Step 3: Check Animation Render Loop
*SAFE TO INSPECT*
In `src/components/Character/Scene.tsx`:
*   An unconstrained `requestAnimationFrame(animate)` loop runs bone updates and mouse coordinate tracking.
*   Verify whether `mixer.update(delta)` is being passed unreasonable delta values if the tab was backgrounded and restored.

## Recovery

### Client-Side Workaround for Affected Users:
*SAFE TO INSPECT*
*   Instruct the user to enable Hardware Acceleration in browser settings (`Settings` -> `System` -> `Use graphics acceleration when available`).
*   Reload the page in a fresh browser tab to clear the exhausted WebGL context.

### Code / Engineering Remediation:
*REQUIRES HUMAN APPROVAL (Code Modification)*
1.  **Add WebGL Context Lost Listener**:
    In `src/components/Character/Scene.tsx`, attach a `webglcontextlost` event listener on the canvas element:
    ```typescript
    renderer.domElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Suppressing canvas crash.");
    }, false);
    ```
2.  **Add Fallback Static Visual**:
    Ensure the DOM container behind the canvas displays a styled CSS gradient or fallback portrait image if WebGL fails to initialize.

## Validation

1.  Open `http://localhost:5173/` or `https://vishalsuhas-dev.vercel.app` in a browser with hardware acceleration enabled.
2.  Inspect the 3D Character: confirm that the character loads, breathes, and tracks cursor movement across the viewport.
3.  Simulate context loss in Chrome DevTools via `Rendering` -> `Webgl context` -> `Lose context` and verify that the page does not crash or throw uncaught loop errors.

## Rollback

No verified rollback mechanism found for client-side GPU hardware limitations. If a recent release introduced an uncompressed 3D model or oversized texture, roll back to the previous bundle release on Vercel using `deployment-rollback.md`.

## Escalation

Escalate to the frontend developer if:
*   Three.js library updates introduce breaking shader compilation changes.
*   A new 3D model asset exceeds recommended polycount or texture budget for web environments (recommended model size < 3 MB).

## Do Not

*   **DO NOT** replace the optimized Draco-compressed model with an uncompressed `.glb` without verifying network payload impact.
*   **DO NOT** run continuous heavy animations outside of `requestAnimationFrame`.

## Root Cause Follow-Up

1.  Implement a graceful fallback in `src/components/Character/` that unmounts the WebGL canvas and displays a static 2D illustration when `WebGLRenderingContext` is unavailable.
2.  Audit model geometry in Blender/Three.js editor to ensure polygon counts and texture atlas dimensions are optimized for mobile GPUs.
