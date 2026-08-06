# Refactor Plan & Code Modularization

This document outlines the proposed CSS token refactoring, duplicate layout consolidation, directory restructure reviews, and implementation priorities for Phase 5.

---

## 1. CSS Audit & Design Token Recommendations

An audit of `ProjectExplorer.css` and `MainContainer.css` reveals duplicated variables and colors. Consolidating these into central design tokens will improve theme scalability:

-   **Colors**:
    *   *Violet Accent*: `rgba(194, 164, 255, 0.4)` / `rgba(194, 164, 255, 0.1)` (scattered in Gantt bars, tab highlights, log selections, and user chat bubbles).
    *   *White Borders*: `rgba(255, 255, 255, 0.05)` / `rgba(255, 255, 255, 0.03)` (duplicated on accordion headers, log boxes, bento margins, and modal cards).
-   **Typography**: Glass panels repeatedly declare:
    *   `font-family: Inter, sans-serif`
    *   `font-family: Courier, monospace` (for terminals)
-   **Transitions**: Accordions and panels duplicate `transition: all 0.2s cubic-bezier(...)` times.

### Target Consolidated Tokens (`src/styles/tokens.css`):
```css
:root {
  --color-accent-solid: #c2a4ff;
  --color-accent-glow: rgba(194, 164, 255, 0.4);
  --color-accent-subtle: rgba(194, 164, 255, 0.05);
  --border-light: 1px solid rgba(255, 255, 255, 0.05);
  --bg-dark-panel: rgba(255, 255, 255, 0.01);
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'Courier New', Courier, monospace;
  --transition-standard: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --glass-blur: blur(8px);
}
```

---

## 2. Shared Component Extraction Targets

We identified identical UI layers that should be extracted into reusable primitives:

1.  **GlassCard**: Duplicated in `WhatIDo` skills, `Work` project cards, and `ProjectExplorer` summaries.
    *   *Extract to*: `src/components/common/GlassCard.tsx`
2.  **TerminalConsole**: Duplicated in the CI/CD Pipeline logs output and the Observability log stream view.
    *   *Extract to*: `src/components/common/TerminalConsole.tsx`
3.  **TimelineTracker**: Duplicated in the roadmap milestones (Overview tab), the deployment stages (Operations tab), and the incident post-mortem events (Operations tab).
    *   *Extract to*: `src/components/common/TimelineTracker.tsx`
4.  **StatusBadge**: Duplicated across project releases, build tags, and incident severities (`Sev-1` / `Sev-2`).
    *   *Extract to*: `src/components/common/StatusBadge.tsx`

---

## 3. Recommended Phase 5 Folder Restructure

We recommend grouping components by domain rather than keeping them flat:

```
src/
├── components/
│   ├── common/
│   │   ├── GlassCard.tsx
│   │   ├── TerminalConsole.tsx
│   │   ├── TimelineTracker.tsx
│   │   └── StatusBadge.tsx
│   ├── workspace/
│   │   ├── ProjectExplorer.tsx
│   │   ├── tabs/
│   │   │   ├── OverviewTab.tsx
│   │   │   ├── ArchitectureTab.tsx
│   │   │   ├── OperationsTab.tsx
│   │   │   └── QualityTab.tsx
│   │   ├── visualizers/
│   │   │   ├── DeploymentVisualizer.tsx
│   │   │   └── PipelineVisualizer.tsx
│   │   └── chat/
│   │       ├── KnowledgeChatBox.tsx
│   │       └── SearchInput.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── WhatIDo.tsx
│       └── Work.tsx
├── hooks/
│   ├── useKeyPress.ts
│   └── useScrollSmoother.ts
├── data/
├── types/
└── styles/
```

---

## 4. Refactor Priority Matrix

1.  **High Priority**: Extract type definitions and data log modules away from the main components (Done).
2.  **Medium Priority**: Modularize the tab panels from `ProjectExplorer.tsx` to clear file sizing hotspots (reduces `ProjectExplorer.tsx` from 2,200 lines to under 400 lines).
3.  **Low Priority**: Build central CSS variable lists to clean up custom inlined color bindings.
