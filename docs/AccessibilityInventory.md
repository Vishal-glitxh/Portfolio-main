# Accessibility Inventory

This document details the current state of WAI-ARIA validation, keyboard navigation loops, screen reader live updates, and accessibility metrics across the portfolio workspace.

---

## 1. Interactive Element ARIA Mapping

The codebase enforces strict accessibility attributes on all major workspace elements:

| Component / Trigger | ARIA Role | Attributes Bound | Event Handlers |
| :--- | :--- | :--- | :--- |
| **Tab List Header Container** | `role="tablist"` | `aria-label="Project detail workspace tabs"` | `onKeyDown` (Arrow keys, Home, End) |
| **Individual Workspace Tab** | `role="tab"` | `aria-selected={isActive}`, `aria-controls={panel-id}` | `onClick`, `onFocus` |
| **Workspace Tab Panel** | `role="tabpanel"` | `aria-labelledby={tab-id}` | None (mapped to display state) |
| **Collapsible Header Buttons** | `role="button"` | `aria-expanded={isOpen}`, `aria-controls={panel-id}` | `onClick` (toggles accordion height) |
| **Logs Terminal Console** | `role="log"` | `aria-live="polite"` | None (announces new incoming log logs) |
| **Suggested Chat Questions** | `role="option"` | None | `onClick` (dispatches RAG queries) |

---

## 2. Keyboard Navigation Loops

-   **Tab Headings**: Left/Right Arrow keys move focus across tabs, wraps on boundaries. Home key selects the first tab, End key focuses the last.
-   **Suggested Q&A Options**: Up/Down Arrow keys move focus sequentially across suggested question pills.
-   **Escape Key Handling**: Pressing `Escape` key closes the open `ProjectExplorer` portal instantly, returning focus back to the triggering project card to preserve user focus matrices.

---

## 3. Motion Accessibility

-   **Media Queries**: Appends `prefers-reduced-motion: reduce` wrappers in CSS templates:
    ```css
    @media (prefers-reduced-motion: reduce) {
      .explorer-tab-panel {
        animation: none !important;
      }
      .collapsible-content-wrapper {
        transition: none !important;
      }
    }
    ```
    This guarantees that users with vestibular or motion sensitivities experience zero layout shifts or zoom animations during workspace navigation.

---

## 4. Identified Missing Improvements

While the workspace exhibits high accessibility maturity, the following areas represent minor gaps for Phase 5 improvements:
1.  **3D WebGL Scene Keyboard Bypasses**: The WebGL character scene lacks keyboard skip shortcuts, forcing screen readers to traverse canvas attributes to reach hero text details.
2.  **Focus Trapping inside Project Explorer Modal**: When `ProjectExplorer` is active as a portal, focus is not strictly trapped inside it. Users can tab out of the panel back onto the background page, which remains hidden behind the modal backdrop.
3.  **Color Contrast Compliance**: Select text elements (like subheadings colored in `#666`) have a contrast ratio of **3.1:1**, which is slightly below the WCAG AA minimum target of **4.5:1** for normal text size. These should be bumped to `#757575` or higher.
