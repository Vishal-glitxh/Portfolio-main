# State Inventory

This document lists, audits, and profiles all React state hooks declared in the portfolio.

---

## 1. Application-Level States

### `isExplorerOpen`
*   **Owner**: `MainContainer.tsx`
*   **Type**: `boolean`
*   **Initial Value**: `false`
*   **Update Frequency**: Low (triggered on click "Explore")
*   **Rerender Scope**: MainContainer wrapper (triggers lazy mount of ProjectExplorer)
*   **Performance Impact**: Negligible
*   **Derived Candidate**: No
*   **Context Candidate**: Yes (can be shared via a navigation context to allow modal launches from other headers)

### `selectedProject`
*   **Owner**: `MainContainer.tsx`
*   **Type**: `string | null`
*   **Initial Value**: `null`
*   **Update Frequency**: Low
*   **Rerender Scope**: MainContainer wrapper
*   **Performance Impact**: Negligible
*   **Derived Candidate**: No
*   **Context Candidate**: Yes

---

## 2. Project Explorer Workspace States

### `activeTab`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `"overview" | "architecture" | "engineering" | "operations" | "qa" | "assistant"`
*   **Initial Value**: `"overview"`
*   **Update Frequency**: Medium (on tab navigation header clicks)
*   **Rerender Scope**: ProjectExplorer panels wrapper
*   **Performance Impact**: Low (re-evaluation of panel displays `activeTab === "..." ? "flex" : "none"`)
*   **Derived Candidate**: No
*   **Context Candidate**: Yes (can be decoupled into a workspace context)

### `expandedSections`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `Record<string, boolean>`
*   **Initial Value**: `{ summary: true, notebook: true, journal: true, performance: true, testing: true, ... }`
*   **Update Frequency**: Medium (on accordion clicks)
*   **Rerender Scope**: Accordion headers & body displays
*   **Performance Impact**: Low
*   **Derived Candidate**: No
*   **Context Candidate**: No

### `selectedPipelineStepId`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `string | null`
*   **Initial Value**: `null`
*   **Update Frequency**: Medium (on step box click)
*   **Rerender Scope**: Pipeline visualizer and terminal logs panel
*   **Performance Impact**: Low
*   **Derived Candidate**: Yes (current active step's log array is derived from the pipeline dataset matching this ID)
*   **Context Candidate**: No

### `selectedLogLevel`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `"ALL" | "ERROR" | "WARN" | "INFO"`
*   **Initial Value**: `"ALL"`
*   **Update Frequency**: Medium
*   **Rerender Scope**: Observability log terminal lines
*   **Performance Impact**: Low (filters logs array on render)
*   **Derived Candidate**: No
*   **Context Candidate**: No

### `selectedIncidentId`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `string | null`
*   **Initial Value**: `null`
*   **Update Frequency**: Low
*   **Rerender Scope**: Incident timeline list
*   **Performance Impact**: Low
*   **Derived Candidate**: No
*   **Context Candidate**: No

### `chatMessages`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `ChatMessage[]`
*   **Initial Value**: `[ welcomeMessage ]`
*   **Update Frequency**: High (triggers user prompts and simulation replies)
*   **Rerender Scope**: Knowledge Workspace chat history bubbles and list container
*   **Performance Impact**: Medium (triggers auto-scroll animations)
*   **Derived Candidate**: No
*   **Context Candidate**: Yes

### `isTyping`
*   **Owner**: `ProjectExplorer.tsx`
*   **Type**: `boolean`
*   **Initial Value**: `false`
*   **Update Frequency**: High (on prompt submit / simulation resolved)
*   **Rerender Scope**: Blinking triple dots container
*   **Performance Impact**: Low
*   **Derived Candidate**: No
*   **Context Candidate**: No
