# Dependency Inventory

This document details the library dependencies, version configurations, bundle sizes, upgrades, and criticality assessments of the portfolio.

---

## 1. Core Frameworks & Tooling

### React (v18.3.1)
*   **Purpose**: UI rendering engine, component lifecycle manager, and DOM binder.
*   **Usage**: Wraps all modular pages, tabs, contexts, and hook states.
*   **Bundle Impact**: ~45 kB
*   **Upgrade Considerations**: React 19 upgrades will require refactoring context patterns and verifying compatibility with React Three Fiber (R3F) hooks.
*   **Criticality**: Blocker (entire application builds on React).

### TypeScript (v5.5.3)
*   **Purpose**: Static type verification and contract check guards.
*   **Usage**: Compiles files to static Javascript.
*   **Bundle Impact**: 0 kB (dev-dependency only).
*   **Upgrade Considerations**: Keeping TS aligned with major React updates.
*   **Criticality**: High (guarantees compile-time safety across engineering evidence interfaces).

### Vite (v5.4.4)
*   **Purpose**: Development server and production bundler.
*   **Usage**: Manages code splitting, CSS aggregation, and hot module replacements (HMR).
*   **Bundle Impact**: 0 kB (dev-dependency only).
*   **Upgrade Considerations**: Easy micro updates.
*   **Criticality**: High.

---

## 2. Animation & WebGL Engines

### GSAP (GreenSock Animation Platform)
*   **Purpose**: Main layout animation engine.
*   **Usage**: Powering ScrollTrigger and ScrollSmoother scroll containers, section stagger entries, and Project Explorer slide-ins.
*   **Bundle Impact**: ~114 kB
*   **Upgrade Considerations**: License validations when upgrading plugins.
*   **Criticality**: High (scroll effects, navbar, and layouts rely entirely on GSAP).

### Three.js (r156) & R3F (React Three Fiber)
*   **Purpose**: WebGL 3D rendering pipeline.
*   **Usage**: Loads GLTF models, binds camera lighting matrices, renders shaders, and idle animations.
*   **Bundle Impact**: ~597 kB
*   **Upgrade Considerations**: Three.js is notorious for breaking changes across versions. Any update to r160+ requires checking material loader properties, mesh bone rotations, and animation clip selectors.
*   **Criticality**: Medium-High (3D scene adds wow factor but fallback panels exist).

---

## 3. UI Helpers

### Framer Motion
*   **Purpose**: Micro-interactions animation library.
*   **Usage**: Minor card entries and alert flags.
*   **Bundle Impact**: ~32 kB
*   **Upgrade Considerations**: Redundant helper (can be replaced with lightweight CSS transitions or GSAP stagger sequences to drop 32KB from initial bundle).
*   **Criticality**: Low.
