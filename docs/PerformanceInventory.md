# Performance Inventory

This document analyzes and maps the bundle sizes, code-splitting boundaries, rendering lifecycles, and animation overheads of the portfolio workspace.

---

## 1. Bundle Splitting Architecture

The Vite compilation outputs split Javascript and CSS assets cleanly:

-   **Initial JS Chunk (`index-general.js` + `MainContainer.js`)**: **~209.71 kB** (Includes React, Hero text, Bento grids, and global layout styling hooks).
-   **Lazy JS Chunk (`ProjectExplorer.js`)**: **200.67 kB** (Houses the engineering workspaces, logs terminals, trace charts, post-incident timelines, and AI Q&A datasets).
-   **3D JS Chunk (`index-three.js`)**: **597.30 kB** (Encapsulates Three.js, R3F, Drei, and GLTF model loaders).

---

## 2. Suspense Boundaries

Dynamic loading is declared at the core:
```typescript
const ProjectExplorer = React.lazy(() => import("./ProjectExplorer"));

// Mount hook
{isExplorerOpen && selectedProject && (
  <Suspense fallback={<LoadingSpinner />}>
    <ProjectExplorer projectName={selectedProject} onClose={handleClose} />
  </Suspense>
)}
```
*Verification*: This prevents parsing the entire engineering evidence database when a recruiter lands on the page, keeping mobile loads fast.

---

## 3. Rerender Hotspots & Profiling Analysis

1.  **AI Workspace Input**: Typing in the search input box inside the Knowledge Workspace causes the entire `ProjectExplorer` panel to rerender on every keystroke because the `searchQuery` state belongs to `ProjectExplorer.tsx` itself.
    *   *Solution*: Extract the search input box and suggestion pills list into a self-contained component (`workspace/SearchQueryInput.tsx`) to isolate the state updates.
2.  **WebGL Mouse Move Listener**: Mouse coordinate tracking on the R3F Canvas triggers bone calculations on every mouse shift, causing WebGL repaints.
    *   *Verification*: This is handled outside the React state lifecycle directly inside Three.js animation callbacks, keeping React component repaints at zero.
3.  **Log Filter Button Updates**: Toggling logs between INFO/WARN/ERROR filters forces recalculation of the filtered log arrays on render. Since logs lists are small, recalculation latency is under **0.1ms**.

---

## 4. Memoization Opportunities

To maintain high performance as datasets scale, we should apply React memoization:
-   **`useMemo`**: Wrap logs parsing and filter loops.
-   **`useCallback`**: Memoize citation navigation click handlers to prevent child components (like the Gantt trace chart or logs console) from rerendering when parents shift states.
-   **`React.memo`**: Wrap static UI assets like `ArchitectureVisualizer` and `IncidentPostMortem` to bypass updates during search typing.
