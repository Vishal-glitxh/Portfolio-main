import { EngineeringNotebook } from "../../../types";

export const idpLogs: EngineeringNotebook = {
  projectId: "idp",
  title: "Intelligent Development Platform Logs",
  summary: "Engineering decisions on SQLite relational databases, Prisma ORM constraints, and real-time SVG grid coordinates.",
  decisions: [
    {
      id: "idp-orm-relational",
      title: "SQLite & Prisma ORM vs SQLite Raw Driver Queries",
      context: "Modeling relationships between employee assessment scores, skills categories, and course recommendations.",
      reasoning: "Prisma enforces database-level referential integrity and produces type-safe queries, preventing schema drift during rapid feature developments.",
      alternatives: [
        "Raw SQLite driver strings (hard to audit and prone to manual syntax issues)",
        "MongoDB Document Storage (lacks database-level referential integrity for complex parent-child employee relations)"
      ],
      tradeoffs: [
        "Adds Prisma compilation and migration steps to the build cycle",
        "ORM queries add a slight abstraction overhead compared to raw SQL queries"
      ],
      outcome: "Guaranteed 100% database referential integrity and automated developer model builds.",
      category: "Database/ORM",
      tags: ["SQLite", "Prisma ORM", "TypeScript Schema"],
      difficulty: "Medium"
    },
    {
      id: "idp-svg-render",
      title: "SVG Canvas Coordinates vs HTML Grid Placements",
      context: "Rendering a workforce talent matrix (9-Box grid) plotting 500+ employees dynamically.",
      reasoning: "SVGs render vector shapes cleanly at any resolution, let us attach standard React event click handlers directly to shapes, and keep DOM counts minimal compared to absolute HTML wrappers.",
      alternatives: [
        "HTML Grid layouts (hard to coordinate custom lines and vector glows)",
        "HTML5 Canvas drawings (makes keyboard accessibility and focus rings hard to build)"
      ],
      tradeoffs: [
        "Requires custom mathematical scaling algorithms to calculate coordinate positions",
        "Manual viewport responsive scales are required for smaller viewports"
      ],
      outcome: "Rendered interactive 9-box grids with zero lag and clean accessibility tags.",
      category: "UI Rendering",
      tags: ["SVG", "Talent Matrix", "Data Visualization"],
      difficulty: "High"
    }
  ]
};
