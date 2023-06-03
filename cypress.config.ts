import { defineConfig } from "cypress";
// import { loadEnvConfig } from "@next/env";
require("dotenv").config();

// const { combineEnv } = loadEnvConfig(process.cwd());
export default defineConfig({
  // defaultCommandTimeout: 10000,
  env: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  video: false,
  chromeWebSecurity: false,
  screenshotOnRunFailure: false,
});
