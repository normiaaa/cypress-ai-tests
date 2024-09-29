// cypress/e2e/signin.cy.ts
import { TestIds } from '../support/testIds';

describe('Sign In Page', () => {
	beforeEach(() => {
		cy.fixture('signinTexts').as('texts');
		cy.visit('http://localhost:3000/signin');
	});

	it('should render the sign-in form correctly', function () {
		cy.get(TestIds.USERNAME_INPUT).should('exist');
		cy.get(TestIds.PASSWORD_INPUT).should('exist');
		cy.get(TestIds.SUBMIT_BUTTON).should('be.enabled');
		cy.get(TestIds.SIGNUP_LINK).should('contain', this.texts.signUpText);
	});

	it('should show validation error when username is empty', function () {
		cy.get(TestIds.SUBMIT_BUTTON).click();
		cy.get(TestIds.USERNAME_ERROR).should('contain', this.texts.usernameRequired);
	});

	it('should enable the submit button when both fields are filled', () => {
		cy.signIn('testuser', 'password123');
		cy.get(TestIds.SUBMIT_BUTTON).should('not.be.disabled');
	});

	it('should successfully log in with valid credentials', function () {
		const username = Cypress.env('username');
		const password = Cypress.env('password');

		cy.intercept('POST', '/api/login', {
			statusCode: 200,
			body: { message: this.texts.successLoginMessage },
		}).as('loginRequest');

		cy.signIn(username, password);

		cy.url().should('include', '/');
	});

	it('should show an error message on failed login', function () {
		cy.intercept('POST', '/api/login', {
			statusCode: 401,
			body: { error: this.texts.invalidCredentials },
		}).as('loginRequest');

		cy.signIn('invaliduser@example.com', 'wrongpassword');

		cy.get(TestIds.ERROR_MESSAGE).should('be.visible');
	});

	it('should remember user when "Remember me" is checked', function () {
		cy.signIn('testuser', 'password123');

		cy.get(TestIds.REMEMBER_ME_CHECKBOX).click();
	});
});
