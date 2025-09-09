import { HOMEPAGE_TEST_IDS } from '../support/testIDs/homepage';

describe('Homepage', () => {
	beforeEach(() => {
		cy.fixture('homepageTexts').as('homepageTexts');
		cy.visit('/signin');
		cy.loginViaUI(Cypress.env('username'), Cypress.env('password'));
	});

	it('The homepage is rendered correctly with all elements visible and hrefs verified', function () {
		// Wait for network requests to complete
		cy.intercept('GET', '/transactions/public').as('getTransactions');
		cy.wait('@getTransactions');

		// Main content verification
		cy.getByTestID(HOMEPAGE_TEST_IDS.MAIN_CONTENT).should('be.visible');

		// Navigation tabs - comprehensive verification
		cy.getByTestID(HOMEPAGE_TEST_IDS.EVERYONE_TAB)
			.should('be.visible')
			.and('contain.text', this.homepageTexts.navigation.everyone)
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(HOMEPAGE_TEST_IDS.FRIENDS_TAB)
			.should('be.visible')
			.and('contain.text', this.homepageTexts.navigation.friends)
			.and('have.attr', 'tabindex', '-1');

		cy.getByTestID(HOMEPAGE_TEST_IDS.MINE_TAB)
			.should('be.visible')
			.and('contain.text', this.homepageTexts.navigation.mine)
			.and('have.attr', 'tabindex', '-1');

		// Header buttons - comprehensive verification
		cy.getByTestID(HOMEPAGE_TEST_IDS.NEW_TRANSACTION_BUTTON)
			.should('be.visible')
			.and('include.text', this.homepageTexts.header.newButton)
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(HOMEPAGE_TEST_IDS.NOTIFICATIONS_BUTTON)
			.should('be.visible')
			.and('contain.text', this.homepageTexts.header.notificationsCount)
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(HOMEPAGE_TEST_IDS.SIDEBAR_TOGGLE_BUTTON).should('be.visible').and('have.attr', 'tabindex', '0');

		// Filter buttons - comprehensive verification
		cy.getByTestID(HOMEPAGE_TEST_IDS.DATE_RANGE_FILTER)
			.should('be.visible')
			.and('contain.text', this.homepageTexts.filters.dateRange)
			.and('have.attr', 'role', 'button')
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(HOMEPAGE_TEST_IDS.AMOUNT_RANGE_FILTER)
			.should('be.visible')
			.and('contain.text', this.homepageTexts.filters.amountRange)
			.and('have.attr', 'role', 'button')
			.and('have.attr', 'tabindex', '0');

		// Verify transaction list has content (not empty)
		cy.getByTestID(HOMEPAGE_TEST_IDS.TRANSACTION_LIST).should('be.visible').and('not.be.empty');

		// Icon visibility assertions
		cy.getByDataTestID(HOMEPAGE_TEST_IDS.ARROW_DROP_DOWN_ICON).should('be.visible');

		// Footer verification
		cy.get(HOMEPAGE_TEST_IDS.FOOTER).scrollIntoView();
		cy.contains(this.homepageTexts.footer.builtBy).should('be.visible');

		cy.get(`a[href="${this.homepageTexts.hrefs.cypressWebsite}"]`)
			.should('be.visible')
			.and('have.attr', 'target', '_blank')
			.and('have.attr', 'rel', 'noopener noreferrer');
	});
});
