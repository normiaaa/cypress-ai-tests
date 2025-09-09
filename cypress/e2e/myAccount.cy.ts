import { MY_ACCOUNT_TEST_IDS } from '../support/testIDs/myAccount';
import { SIDEBAR_TEST_IDS } from '../support/testIDs/sidebar';

describe('My Account', () => {
	beforeEach(() => {
		cy.fixture('myAccountTexts').as('myAccountTexts');
		cy.visit('/signin');
		cy.loginViaUI(Cypress.env('username'), Cypress.env('password'));
	});

	it('The My Account page is rendered correctly with all elements visible and form fields verified', function () {
		// Navigate to My Account from sidebar
		cy.getByTestID(SIDEBAR_TEST_IDS.USER_SETTINGS_LINK)
			.should('be.visible')
			.and('contain.text', 'My Account')
			.and('have.attr', 'href', '/user/settings')
			.and('have.attr', 'tabindex', '0')
			.click();

		// Verify URL changed to My Account page
		cy.url().should('include', '/user/settings');

		// Main content verification
		cy.getByTestID(MY_ACCOUNT_TEST_IDS.MAIN_CONTENT).should('be.visible');

		// Page title verification
		cy.contains(this.myAccountTexts.page.title).should('be.visible');

		// Form inputs - comprehensive verification
		cy.getByTestID(MY_ACCOUNT_TEST_IDS.FIRST_NAME_INPUT)
			.find('input')
			.should('be.visible')
			.and('have.attr', 'name', 'firstName')
			.and('have.attr', 'type', 'text')
			.and('have.attr', 'required');

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.FIRST_NAME_INPUT)
			.find('input')
			.should('have.value', this.myAccountTexts.form.firstName.value);

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.LAST_NAME_INPUT)
			.find('input')
			.should('be.visible')
			.and('have.attr', 'name', 'lastName')
			.and('have.attr', 'type', 'text')
			.and('have.attr', 'required');

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.LAST_NAME_INPUT)
			.find('input')
			.should('have.value', this.myAccountTexts.form.lastName.value);

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.EMAIL_INPUT)
			.find('input')
			.should('be.visible')
			.and('have.attr', 'name', 'email')
			.and('have.attr', 'type', 'text')
			.and('have.attr', 'required');

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.EMAIL_INPUT)
			.find('input')
			.should('have.value', this.myAccountTexts.form.email.value);

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.PHONE_NUMBER_INPUT)
			.find('input')
			.should('be.visible')
			.and('have.attr', 'name', 'phoneNumber')
			.and('have.attr', 'type', 'text')
			.and('have.attr', 'required');

		cy.getByTestID(MY_ACCOUNT_TEST_IDS.PHONE_NUMBER_INPUT)
			.find('input')
			.should('have.value', this.myAccountTexts.form.phoneNumber.value);

		// Save button - comprehensive verification
		cy.getByTestID(MY_ACCOUNT_TEST_IDS.SAVE_BUTTON)
			.should('be.visible')
			.and('contain.text', this.myAccountTexts.form.saveButton)
			.and('have.attr', 'type', 'submit')
			.and('have.attr', 'tabindex', '0');

		// Illustration verification
		cy.get('svg[data-name="Layer 1"]').should('be.visible');
	});
});
