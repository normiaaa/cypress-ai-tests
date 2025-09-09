// cypress/support/index.d.ts

// Extend Cypress command interface for TypeScript
declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to get element by data-test test ID.
		 * @example cy.getByTestID('submit-button')
		 */
		getByTestID(testID: string): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to get element by data-testid attribute.
		 * @example cy.getByDataTestID('PersonIcon')
		 */
		getByDataTestID(testID: string): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to get element by name attribute.
		 * @example cy.getByName('username')
		 */
		getByName(name: string): Chainable<JQuery<HTMLElement>>;

		/**
		 * Custom command to sign in a user.
		 * @example cy.signIn('username', 'password')
		 */
		loginViaUI(username: string, password: string): Chainable<Element>;
	}
}
