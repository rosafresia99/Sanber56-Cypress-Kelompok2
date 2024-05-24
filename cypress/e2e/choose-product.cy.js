describe('Pilih Produk', () => {

    it('Pilih Produk Positif Scenario', function() {
        cy.visit('https://magento.softwaretestingboard.com/');
        cy.visit('https://magento.softwaretestingboard.com/women/tops-women/jackets-women.html');
        cy.visit('https://magento.softwaretestingboard.com/olivia-1-4-zip-light-jacket.html');

        cy.get('.fotorama__arr fotorama__arr--next').click();
        cy.get('.fotorama__arr fotorama__arr--next').click();
        cy.get('.fotorama__arr fotorama__arr--next').click();
        cy.get('#option-label-size-143-item-166').click();
        cy.get('#option-label-color-93-item-50').click();
        cy.get('#qty').type("2");

        cy.get('#product-addtocart-button').click();
        cy.screenshot('before-submit');

        cy.get('button[title="Create an Account"]').click();
        cy.screenshot('after-submit');
    });
});