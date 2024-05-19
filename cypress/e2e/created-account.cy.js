describe('Create An Account - Positive TC', () => {
    beforeEach(function() {
        cy.fixture('newUser.json').then((data) => {
            this.userData = data;
        });
    });

    it('Fill the account creation form', function() {
        cy.visit('https://magento.softwaretestingboard.com/');
        cy.contains('Create an Account').click();
        cy.url().should('include', '/customer/account/create/');

        cy.contains('#firstname').type(this.userData.firstname);
        cy.get('#lastname').type(this.userData.lastname);
        cy.get('#email_address').type(this.userData.email_address);
        cy.get('#password').type(this.userData.password);
        cy.get('#password-confirmation').type(this.userData['password-confirmation']);
        cy.screenshot('before-submit');

        cy.get('button[title="Create an Account"]').click();
        cy.screenshot('after-submit');

        cy.url().should('include', '/customer/account/');
        cy.log('Waiting for success message...');
        cy.contains('Thank you for registering with', { timeout: 50000 }).should('be.visible');
        cy.screenshot('after-success');
    });
});
