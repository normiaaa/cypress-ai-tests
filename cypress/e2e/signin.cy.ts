import { LOGIN_TEST_IDS } from '../support/testIDs/login';

describe('Sign In Page', () => {
	beforeEach(() => {
		cy.fixture('signinTexts').as('texts');
		cy.visit('/signin');
	});

	it('The sign in form is rendered correctly', function () {
		cy.url().should('include', '/signin');
		cy.getByName(LOGIN_TEST_IDS.USERNAME_INPUT).should('be.visible');
		cy.getByName(LOGIN_TEST_IDS.PASSWORD_INPUT).should('be.visible');
		cy.getByTestID(LOGIN_TEST_IDS.SUBMIT_BUTTON).should('be.enabled');
		cy.getByTestID(LOGIN_TEST_IDS.SIGNUP_LINK).should('be.visible').and('have.text', this.texts.signUpText);
	});

	it('Log in with valid credentials', function () {
		const username = Cypress.env('username');
		const password = Cypress.env('password');

		cy.intercept('POST', '/login', {
			statusCode: 200,
			body: { message: this.texts.successLoginMessage },
		}).as('loginRequest');

		cy.loginViaUI(username, password);
		cy.wait('@loginRequest');

		cy.url().should('not.include', '/signin');
	});

	it('Error messages are displayed correctly when the fields are empty', function () {
		cy.getByTestID(LOGIN_TEST_IDS.SUBMIT_BUTTON).click();
		cy.get(LOGIN_TEST_IDS.USERNAME_ERROR).should('contain', this.texts.invalidCredentials);
	});

	it('An error message is displayed correctly when the credentials are invalid', function () {
		cy.intercept('POST', '/login', {
			statusCode: 401,
			body: { error: this.texts.invalidCredentials },
		}).as('loginRequest');

		cy.loginViaUI('invaliduser@example.com', 'wrongpassword');

		cy.getByTestID(LOGIN_TEST_IDS.ERROR_MESSAGE)
			.should('be.visible')
			.and('have.text', this.texts.invalidCredentialsError);
	});
});
