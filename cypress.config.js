import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    defaultCommandTimeout: 8000,
    screenshotOnRunFailure: true,
    reporter: 'mochawesome',
    reporterOptions: {
        html: true,
        json: false,
        reportDir: 'cypress/reports',
        charts: true,
        reportPageTitle: 'Report e2e ecommerce',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
    },



    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        viewportWidth: 1500,
        viewportHeight: 1000,
        supportFile: 'cypress/e2e/support/e2e.js',
        setupNodeEvents(on, config) {

        },
    },
    env: {
        VALID_USER: process.env.VALID_USER,
        VALID_PASSWORD: process.env.VALID_PASSWORD,
        INVALID_USER: process.env.INVALID_USER,
        INVALID_PASSWORD: process.env.INVALID_PASSWORD,
    },
});