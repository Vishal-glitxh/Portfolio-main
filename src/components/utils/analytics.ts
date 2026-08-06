/**
 * Interaction hooks for Recruiter Analytics telemetry.
 * These are simple event hook placeholders for future integrations.
 */

export const trackProjectOpened = (projectName: string) => {
  console.log(`[Telemetry] Project Opened: ${projectName}`);
  // Future Integration: trackEvent("project_opened", { name: projectName });
};

export const trackGitHubClicked = (projectName: string, url: string) => {
  console.log(`[Telemetry] GitHub Link Clicked for ${projectName}: ${url}`);
  // Future Integration: trackEvent("github_clicked", { name: projectName, url });
};

export const trackDemoClicked = (projectName: string, url: string) => {
  console.log(`[Telemetry] Live Demo Link Clicked for ${projectName}: ${url}`);
  // Future Integration: trackEvent("demo_clicked", { name: projectName, url });
};

export const trackArchitectureViewed = (projectName: string) => {
  console.log(`[Telemetry] Architecture Section Viewed for: ${projectName}`);
  // Future Integration: trackEvent("architecture_viewed", { name: projectName });
};

export const trackResumeDownloaded = () => {
  console.log("[Telemetry] Resume download/preview action triggered.");
  // Future Integration: trackEvent("resume_downloaded");
};

export const trackRecruiterModeOpened = () => {
  console.log("[Telemetry] Recruiter Mode side panel opened.");
  // Future Integration: trackEvent("recruiter_mode_opened");
};

export const trackRecruiterModeClosed = () => {
  console.log("[Telemetry] Recruiter Mode side panel closed.");
  // Future Integration: trackEvent("recruiter_mode_closed");
};

export const trackProjectClosed = (projectName: string) => {
  console.log(`[Telemetry] Project Explorer closed: ${projectName}`);
  // Future Integration: trackEvent("project_closed", { name: projectName });
};
