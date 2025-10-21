import { SIDEBAR_TEST_IDS } from '../support/testIDs/sidebar';

describe('Sidebar', () => {
	beforeEach(() => {
		cy.fixture('sidebarTexts').as('sidebarTexts');
		cy.visit('/signin');
		cy.loginViaAPI(Cypress.env('username'), Cypress.env('password'));
	});

	it('The sidebar is rendered correctly with all elements visible and hrefs verified', function () {
		// User profile section assertions
		cy.get('.NavDrawer-avatar img')
			.should('be.visible')
			.and('have.attr', 'alt', this.sidebarTexts.userProfile.avatarAlt);

		cy.getByTestID(SIDEBAR_TEST_IDS.USER_FULL_NAME)
			.should('be.visible')
			.and('have.text', this.sidebarTexts.userProfile.fullName);

		cy.getByTestID(SIDEBAR_TEST_IDS.USERNAME)
			.should('be.visible')
			.and('have.text', this.sidebarTexts.userProfile.username);

		cy.getByTestID(SIDEBAR_TEST_IDS.USER_BALANCE)
			.should('be.visible')
			.and('have.text', this.sidebarTexts.userProfile.balance);

		cy.contains(this.sidebarTexts.userProfile.accountBalanceLabel).should('be.visible');

		// Navigation links - comprehensive verification
		cy.getByTestID(SIDEBAR_TEST_IDS.HOME_LINK)
			.should('be.visible')
			.and('contain.text', this.sidebarTexts.navigation.home)
			.and('have.attr', 'href', this.sidebarTexts.hrefs.home)
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(SIDEBAR_TEST_IDS.USER_SETTINGS_LINK)
			.should('be.visible')
			.and('contain.text', this.sidebarTexts.navigation.myAccount)
			.and('have.attr', 'href', this.sidebarTexts.hrefs.userSettings)
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(SIDEBAR_TEST_IDS.BANK_ACCOUNTS_LINK)
			.should('be.visible')
			.and('contain.text', this.sidebarTexts.navigation.bankAccounts)
			.and('have.attr', 'href', this.sidebarTexts.hrefs.bankAccounts)
			.and('have.attr', 'tabindex', '0');

		cy.getByTestID(SIDEBAR_TEST_IDS.NOTIFICATIONS_LINK)
			.should('be.visible')
			.and('contain.text', this.sidebarTexts.navigation.notifications)
			.and('have.attr', 'href', this.sidebarTexts.hrefs.notifications)
			.and('have.attr', 'tabindex', '0');

		// Signout button - comprehensive verification
		cy.getByTestID(SIDEBAR_TEST_IDS.SIGNOUT_BUTTON)
			.should('be.visible')
			.and('contain.text', this.sidebarTexts.navigation.logout)
			.and('have.attr', 'role', 'button')
			.and('have.attr', 'tabindex', '0');

		// Icon visibility assertions
		cy.getByDataTestID(SIDEBAR_TEST_IDS.PERSON_ICON).should('be.visible');

		cy.getByDataTestID(SIDEBAR_TEST_IDS.ACCOUNT_BALANCE_ICON).should('be.visible');

		cy.getByDataTestID(SIDEBAR_TEST_IDS.NOTIFICATIONS_ICON).should('be.visible');

		cy.getByDataTestID(SIDEBAR_TEST_IDS.EXIT_TO_APP_ICON).should('be.visible');
	});
});
