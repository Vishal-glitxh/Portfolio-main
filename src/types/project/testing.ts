export interface TestSuite {
  id: string;
  title: string;
  category: "Unit" | "Integration" | "End-to-End" | "Performance" | "Accessibility" | "Manual QA";
  coverage: number; // percentage
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  technologies: string[];
  verificationCommand: string;
  notes: string;
}

export interface QAItem {
  id: string;
  title: string;
  status: "Passed" | "Pending" | "Blocked" | "Not Applicable";
  notes: string;
}

export interface BrowserCompatibility {
  browser: string;
  version: string;
  desktop: "Supported" | "Partial" | "Unsupported";
  mobile: "Supported" | "Partial" | "Unsupported" | "Not Applicable";
  notes: string;
}

export interface RiskMatrixItem {
  id: string;
  title: string;
  likelihood: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High" | "Critical";
  mitigation: string;
  owner: string;
}

export interface ReleaseChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  notes: string;
}

export interface TestingStrategy {
  projectId: "novaisland" | "study-companion" | "idp" | "portfolio";
  overview: string;
  testSuites: TestSuite[];
  browserMatrix: BrowserCompatibility[];
  manualQA: QAItem[];
  releaseChecklist: ReleaseChecklistItem[];
  risks: RiskMatrixItem[];
}
