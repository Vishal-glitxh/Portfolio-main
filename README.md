# Vishal Suhas — Developer Portfolio 🚀

Welcome to my personal developer portfolio repository! This project highlights my work, engineering case studies, and credentials as an AI Engineer & Full-Stack Developer.

---

## 🔗 Live Links

*   **Live Demo**: [vishalsuhas.com](https://vishalsuhas-dev.vercel.app/)
*   **LinkedIn**: [linkedin.com/in/vishalsuhas](https://www.linkedin.com/in/vishalsuhas)
*   **GitHub**: [github.com/Vishal-glitxh](https://github.com/Vishal-glitxh)
*   **Email**: [vishalsuhas0662@gmail.com](mailto:vishalsuhas0662@gmail.com)

---

## ✨ Features

- **Interactive 3D Avatar**: Custom 3D typing character interacting with user scrolling and movement.
- **Glassmorphic Bento Grid**: Responsive modern grid representation of technical stack skills matching my exact skillset.
- **Horizontal Scroll Gallery**: Showcasing featured projects (NovaIsland, AI Study Companion, IDP, and Personal Portfolio) in a smooth slide structure.
- **Recruiter Mode Panel (Phase 1)**: Lazy-loaded, overlay-mounted console presenting key metrics, resume quick actions, and recruiter-focused answers.
- **Interactive Project Explorer (Phase 2 • Build 2.1)**: Lazy-loaded side panel overlay allowing recruiters to inspect the engineering problem, solution, architecture flow, and categorized technology stack of each project.
- **Performance Optimized**: Streamlined bundles, code-splitting (splitting Recruiter Mode and Project Explorer into distinct lazy chunks), and low-latency interaction listeners.

---

## ♿ Accessibility (A11y) & Standards

Both the **Recruiter Mode Panel** and the **Project Explorer** implement comprehensive accessibility guidelines:
- **Keyboard Navigation Focus Trap**: Focus is strictly trapped inside open modals, cycling cleanly between interactive elements and preventing background focus leaks.
- **Escape Key Closing**: Binds the `Escape` key and background backdrop clicks to trigger smooth reverse animations and close components.
- **Focus Restoration**: Automatically captures and returns focus to the originating button or project card upon closing overlays.
- **ARIA Attributes**: Built with proper roles (`role="dialog"`, `aria-modal="true"`) and label descriptors.
- **Body Scroll Block**: Locks scrolling on the parent document while panels are active.

---

## ⚙️ Tech Stack

- **Languages**: Python, Java, C++, C, JavaScript, Swift, HTML5
- **Frontend**: React, Next.js, CSS3, GSAP (ScrollTrigger & ScrollSmoother), Three.js / React Three Fiber, Framer Motion
- **Backend & Databases**: Node.js, Express.js, Flask, MongoDB, MySQL, SQLite, Prisma ORM
- **AI & Data Science**: Machine Learning, Deep Learning, Neural Networks, NLP, Computer Vision, Scikit-Learn, NumPy / Pandas, Matplotlib, Power BI

---

## 📂 Project Structure

```text
├── docs/               # Engineering architecture & inventories documentation
├── public/             # Static public assets (3D models, icons, resumes)
├── src/
│   ├── components/     # React UI components (WhatIDo, TechStack, Cards)
│   │   ├── Character/  # Three.js 3D character engine & controls
│   │   ├── styles/     # Component-specific CSS layouts
│   │   └── utils/      # Timeline and analytics telemetry helpers
│   ├── contexts/       # Global React context state providers
│   ├── data/           # Engineering records & mockups datasets
│   ├── types/          # Static TypeScript interfaces
│   ├── App.tsx         # Root layout entry point
│   ├── index.css       # Global styles override
│   └── main.tsx        # React DOM render mount
├── README.md           # Repository documentation
├── LICENSE             # MIT License file
├── package.json        # Dependencies catalog
└── vite.config.ts      # Vite builder configuration
```

---

## 🚀 Local Development

To run this project locally, follow these instructions.

### Prerequisites
*   Node.js (version 18 or above recommended)
*   npm (or yarn / pnpm)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Vishal-glitxh/portfolio-main.git
   cd portfolio-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the hot-reloading development server:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Build & Compilation
To compile and bundle assets for production hosting:
```bash
npm run build
```
The output bundle will be generated inside the `dist/` directory.

### Local Preview
To preview the compiled production build locally:
```bash
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
Copyright © 2026.
