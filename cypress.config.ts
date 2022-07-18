import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "tests/cypress/fixtures",
  screenshotsFolder: "tests/cypress/screenshots",
  videosFolder: "tests/cypress/videos",

  e2e: {
    supportFile: "tests/cypress/support/e2e.ts",
    specPattern: "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },

  component: {
    supportFile: "tests/cypress/support/component.ts",
    specPattern: "tests/cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: "tests/cypress/support/component-index.html",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
