// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.ts

// Custom command to fill out the sign-in form and submit it
// cypress/support/commands.ts

// Custom command to sign in

import { LOGIN_TEST_IDS } from './testIDs/login'; // Adjust the import path if necessary

Cypress.Commands.add('getByTestID', (testID: string) => {
	return cy.get(`[data-test="${testID}"]`);
});

Cypress.Commands.add('getByDataTestID', (testID: string) => {
	return cy.get(`[data-testid="${testID}"]`);
});

Cypress.Commands.add('getByName', (testID: string) => {
	return cy.get(`[name="${testID}"]`);
});

Cypress.Commands.add('loginViaUI', (username: string, password: string) => {
	cy.getByName(LOGIN_TEST_IDS.USERNAME_INPUT).type(username);
	cy.getByName(LOGIN_TEST_IDS.PASSWORD_INPUT).type(password);
	cy.getByTestID(LOGIN_TEST_IDS.SUBMIT_BUTTON).click();
});
