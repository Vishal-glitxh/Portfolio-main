# Production Runbooks Directory

## Overview

This directory contains verified, actionable production runbooks for the **Vishal Suhas Developer Portfolio** web application (`portfolio-main`).

The portfolio is a client-side Single Page Application (SPA) built with React 18, TypeScript, and Vite, featuring a hybrid rendering architecture with Three.js/WebGL (3D avatar), Draco WebAssembly decoders, GSAP animation orchestration, and dynamic code-split overlays (Project Explorer, Recruiter Panel). It is hosted statically (documented as Vercel on domain `https://vishalsuhas-dev.vercel.app`).

---

## Incident Classification & Severity Model

| Severity | Definition | Target Response |
| :--- | :--- | :--- |
| **P0 — Critical** | Complete service outage or security compromise affecting all users (e.g., DNS failure, malicious asset injection). | Immediate intervention |
| **P1 — High** | Major feature breakdown or full rendering lockout (e.g., loading screen indefinitely stalled at 91%, broken production build deployment). | Within 1 hour |
| **P2 — Medium** | Partial visual or performance degradation (e.g., WebGL context crash fallback, 3D avatar missing while UI overlay remains functional). | Within 4 hours |
| **P3 — Low** | Minor cosmetic defect, non-blocking telemetry irregularity, or localized rendering glitch. | Next scheduled release |

---

## Runbook Index

| Runbook | Incident | Severity | Key Systems Involved |
| :--- | :--- | :--- | :--- |
| [loading-screen-stall.md](loading-screen-stall.md) | Landing Page Indefinitely Locked Behind Loader | **P1** | `setProgress.ts`, `Scene.tsx`, `character.ts`, Web Crypto API (`crypto.subtle`), `/models/character.enc`, `/draco/` |
| [webgl-asset-failure.md](webgl-asset-failure.md) | WebGL Context Crash & 3D Avatar Rendering Failure | **P2** | `THREE.WebGLRenderer`, `Scene.tsx`, `draco_decoder.wasm`, GPU memory |
| [production-build-failure.md](production-build-failure.md) | Build Pipeline Failure & Dynamic Chunk Mismatch | **P1** | `tsc -b`, `vite build`, `ProjectExplorer.tsx`, static CDN cache |
| [deployment-rollback.md](deployment-rollback.md) | Static Hosting Release Rollback & Live Site Incident | **P1** | Static Hosting (Vercel / CDN), `dist/` bundle, live domain (`vishalsuhas-dev.vercel.app`) |

---

## Architecture Boundaries & Verified Scope

### Systems Present (Verified)
- **Frontend Core**: React 18, TypeScript 5.5, Vite 5.4, Semantic HTML5/CSS3.
- **Presentation & Animation**: Three.js 0.168, `@react-three/fiber`, `three-stdlib` (DracoLoader), GSAP 3.15 (`ScrollTrigger`, `ScrollSmoother`).
- **Client Decryption**: In-browser Web Crypto API (`crypto.subtle` AES-CBC) decrypting `public/models/character.enc`.
- **Public Assets**: Static models, Draco WebAssembly decoders (`public/draco/`), high dynamic range background (`char_enviorment.hdr`), images.
- **Build / Packaging**: `npm run build` (`tsc -b && vite build`) generating static assets into `dist/`.

### Systems Absent (Verified Absent — Do Not Invent Runbooks)
- **Backend API Server**: None. No Node/Express or Python API daemon is present in this repository.
- **Databases**: None. No relational (PostgreSQL, MySQL) or document (MongoDB) database is connected to the portfolio runtime.
- **Background Queues & Workers**: None. No Celery, Redis, BullMQ, or cron daemons.
- **Server-Side Authentication**: None. No session store or OAuth backend.

---

## Operational Principles

1. **Observe Before Mutating**: Use read-only browser network inspection, browser developer console, and read-only build verification commands before taking any action.
2. **Atomic Deployments**: Ensure CDN asset uploads are atomic and index caching headers prevent stale client chunk requests.
3. **Preserve Reversibility**: Never execute irreversible hosting actions without human confirmation.
