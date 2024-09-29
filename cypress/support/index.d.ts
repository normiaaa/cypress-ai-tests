// cypress/support/index.d.ts

// Extend Cypress command interface for TypeScript
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to sign in a user.
     * @example cy.signIn('username', 'password')
     */
    signIn(username: string, password: string): Chainable<Element>;
  }
}
