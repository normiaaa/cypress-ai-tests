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

import { TestIds } from '../support/testIds'; // Adjust the import path if necessary

Cypress.Commands.add('signIn', (username: string, password: string) => {
	cy.get(TestIds.USERNAME_INPUT).type(username);
	cy.get(TestIds.PASSWORD_INPUT).type(password);
	cy.get(TestIds.SUBMIT_BUTTON).click();
});
