const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index')(on, config)
    },
    //specPattern: '[“**/*.feature”, “cypress/e2e/**/*.cy.{js,jsx,ts,tsx}”]',
    baseUrl: "http://localhost:3000",
    apiServer: "http://localhost:3333",
    viewportWidth: 1440,
    viewportHeight: 900,
    dbConfig: {
      host: "ziggy.db.elephantsql.com",
      user: "spowbegw",
      password: "Q0qjetH1-YRGNefXNFbz2ncpiopm8XBV",
      database: "spowbegw",
      port: 5432
    }
  }
})