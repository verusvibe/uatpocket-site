import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3000",
    browserName: "chromium",
  },
  projects: [
    { name: "chromium", testMatch: "**/site.spec.ts" },
    ...(["chromium", "webkit"] as const).map((browserName) => ({
      name: `${browserName}-touch`,
      testMatch: "**/mobile-navigation.spec.ts",
      use: {
        browserName,
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    })),
  ],
  reporter: "list",
});
