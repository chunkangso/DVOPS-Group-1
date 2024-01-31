const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 200,
  viewportWidth: 200,
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    }
  },
});
