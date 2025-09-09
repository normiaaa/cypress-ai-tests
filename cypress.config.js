// cypress.config.js
/* eslint-disable */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Ensure TypeScript files are picked up
	},
});
