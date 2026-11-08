import { defineConfig } from "@playwright/test";
import development from "./playwright.config";

// Exercise the actual dist artifact beneath the same prefix as GitHub Pages.
export default defineConfig({
  ...development,
  testIgnore: [],
  use: {
    ...development.use,
    baseURL: "http://127.0.0.1:4183/no-swipe-club/",
  },
  webServer: {
    command: "node scripts/serve-pages.mjs",
    url: "http://127.0.0.1:4183/no-swipe-club/",
    reuseExistingServer: false,
  },
});
