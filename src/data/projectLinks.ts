export const projectLinks: Record<string, string> = {
  NovaIsland: "novaisland",
  "AI Study Companion": "ai-study-companion",
  "Intelligent Development Platform (IDP)": "intelligent-development-platform",
  "Personal Portfolio": "personal-portfolio",
};

export const projectForSlug = (slug: string) =>
  Object.keys(projectLinks).find(name => projectLinks[name] === slug);

export const projectPath = (name: string) => `/projects/${projectLinks[name]}`;
