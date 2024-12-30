const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 8000,



    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        viewportWidth: 1500,
        viewportHeight: 1000,
        supportFile: 'cypress/e2e/support/e2e.js',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    },
    env: {
        VALID_USER: process.env.VALID_USER,
        VALID_PASSWORD: process.env.VALID_PASSWORD,
        INVALID_USER: process.env.INVALID_USER,
        INVALID_PASSWORD: process.env.INVALID_PASSWORD,
    },
});