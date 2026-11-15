import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 90000,
  workers: 1,
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'webkit-mobile', testMatch: '**/mobile.spec.ts', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
  ],
  use: { baseURL: 'http://127.0.0.1:4173', viewport: { width: 1440, height: 1000 } },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
});
