import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 393,
  viewportHeight: 891,
  e2e: {
    baseUrl: 'http://localhost:8100',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
