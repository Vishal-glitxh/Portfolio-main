# Component Inventory

This document lists and audits all major UI layout nodes, component containers, and interactive sections inside the portfolio codebase.

---

## 1. MainContainer
*   **Purpose**: Parent layout coordinator for the portfolio's scroll page sections.
*   **Parent**: `App.tsx`
*   **Children**: `Navbar`, `Hero`, `About`, `WhatIDo`, `Work`, `Timeline`, `Footer`, `RecruiterPanel`
*   **Props**: None
*   **Local State**: `isExplorerOpen` (boolean), `selectedProject` (string | null)
*   **Dependencies**: GSAP (ScrollTrigger, ScrollSmoother), `React.lazy`
*   **Animations**: Scroll parallax, vertical section slides.
*   **Accessibility**: Focus wrapper coordination.
*   **Complexity**: Medium
*   **Future Extraction**: Layout wrapper can be split from scroll smoother context.

---

## 2. Navbar
*   **Purpose**: Header navigation displaying contact and portal links.
*   **Parent**: `MainContainer.tsx`
*   **Children**: None
*   **Props**: `onOpenRecruiter` (callback), `onOpenContact` (callback)
*   **Local State**: `isSticky` (boolean)
*   **Dependencies**: CSS variables.
*   **Animations**: Sticky entry fade.
*   **Accessibility**: `role="navigation"`, focus keys.
*   **Complexity**: Low
*   **Future Extraction**: Navigation items can be driven by a static config list.

---

## 3. Hero
*   **Purpose**: Introduction panel housing the 3D character WebGL canvas.
*   **Parent**: `MainContainer.tsx`
*   **Children**: `Scene.tsx` (R3F Canvas)
*   **Props**: None
*   **Local State**: None
*   **Dependencies**: Three.js, React Three Fiber, Drei, GSAP
*   **Animations**: 3D character idle animations, look-at coordinate loops, section slide entry.
*   **Accessibility**: Fallback static image descriptions for screen readers.
*   **Complexity**: High
*   **Future Extraction**: WebGL renderer engine and character config lists are excellent candidates for a dedicated `visualizers/` sub-package.

---

## 4. WhatIDo
*   **Purpose**: Bento grid layout demonstrating engineering skill tracks.
*   **Parent**: `MainContainer.tsx`
*   **Children**: None
*   **Props**: None
*   **Local State**: None
*   **Dependencies**: GSAP ScrollTrigger
*   **Animations**: Grid item stagger fade.
*   **Accessibility**: Descriptive tags.
*   **Complexity**: Low
*   **Future Extraction**: Bento Grid wrapper can be modularized into a reusable layout component.

---

## 5. Work
*   **Purpose**: Showcase cards for case study projects.
*   **Parent**: `MainContainer.tsx`
*   **Children**: None
*   **Props**: `onSelectProject` (callback)
*   **Local State**: None
*   **Dependencies**: Project configuration files.
*   **Animations**: Card hover zoom, glow transitions.
*   **Accessibility**: Keyboard selection triggers, target bounds.
*   **Complexity**: Medium
*   **Future Extraction**: Extraction of individual Project Cards into `cards/ProjectCard.tsx`.

---

## 6. ProjectExplorer
*   **Purpose**: Full-screen tabbed engineering evidence detail panel.
*   **Parent**: `MainContainer.tsx` (Lazy-loaded via React Portal)
*   **Children**: `CollapsibleSection`, `ArchitectureVisualizer`, logs terminals, Gantt traces.
*   **Props**: `projectName` (string), `onClose` (callback)
*   **Local State**: `activeTab` (tab state), `expandedSections` (map), `selectedIncidentId` (string | null), `selectedLogLevel` (string), `chatMessages` (list), `searchQuery` (string)
*   **Dependencies**: `FaCode`, `FaShieldAlt`, `FaFlask`, `FaRoute`, GSAP (for panel open/close slide-in timelines)
*   **Animations**: Workspace slide-in (GSAP), accordion height transitions, blinking dot animations.
*   **Accessibility**: Full WAI-ARIA tab controls, screen reader announcements on logs, and Arrow key suggests.
*   **Complexity**: High
*   **Future Extraction**: Tab layouts, terminal logs consoles, trace Gantt diagrams, and knowledge chat boxes can be split into individual sub-components inside `workspace/`.

---

## 7. ArchitectureVisualizer
*   **Purpose**: Interactive SVG diagram rendering deployment paths.
*   **Parent**: `ProjectExplorer.tsx`
*   **Children**: None
*   **Props**: `projectName` (string)
*   **Local State**: `hoveredNode` (string | null)
*   **Dependencies**: SVG mapping data.
*   **Animations**: Node scale hover, path dot animation loops.
*   **Accessibility**: SVG descriptors and key navigators.
*   **Complexity**: Medium
*   **Future Extraction**: Modularize SVG drawing nodes to `visualizers/DeploymentVisualizer.tsx`.

---

## 8. RecruiterPanel
*   **Purpose**: Drawer allowing recruiters to switch modes (e.g. Recruiter Mode vs. Dev Mode).
*   **Parent**: `MainContainer.tsx`
*   **Children**: None
*   **Props**: None
*   **Local State**: `isOpen` (boolean)
*   **Dependencies**: LocalStorage persistence.
*   **Animations**: Slide-out drawer.
*   **Accessibility**: Keyboard trigger key binds.
*   **Complexity**: Low
*   **Future Extraction**: Mode provider wrapping.
