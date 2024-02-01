const cypressCoverage = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  on('task', cypressCoverage);

  // ... other Cypress configurations

  return config;
};
