describe('Pilih Produk', () => {

    it('Pilih Produk Scenario', function() {
        cy.visit('https://magento.softwaretestingboard.com/');
        cy.visit('https://magento.softwaretestingboard.com/women/tops-women/hoodies-and-sweatshirts-women.html');
        cy.visit('https://magento.softwaretestingboard.com/helena-hooded-fleece.html');
        
        cy.wait(10000);
        
        // cy.get('#gallery-prev-area').click();
        // cy.get('a[href*="#gallery-next-area"]').click()
        
        
        cy.get('#option-label-size-143-item-166').click();
        cy.get('#option-label-size-143-item-167').click();
        cy.get('#option-label-size-143-item-168').click();
        cy.get('#option-label-size-143-item-169').click();
        cy.get('#option-label-size-143-item-170').click();

        cy.get('#option-label-color-93-item-50').click();
        cy.get('#option-label-color-93-item-52').click();
        cy.get('#option-label-color-93-item-60').click();

        cy.get('#qty').clear();
        cy.get('#qty').type("2");
        
        cy.screenshot('before-submit-pilih-produk');
        cy.get('#product-addtocart-button').click();
        cy.wait(5000);
        cy.screenshot('after-submit-pilih-produk');
        cy.visit('https://magento.softwaretestingboard.com/checkout/cart/');

        cy.get('.action-edit').click();
        
        
        cy.get('#option-label-color-93-item-50').click();
        cy.get('#option-label-size-143-item-167').click();
        
        cy.get('#qty').clear();
        cy.get('#qty').type("1");


        cy.screenshot('before-submit-update-pilih-produk');
        cy.get('#product-updatecart-button').click();
        cy.wait(5000);
        cy.screenshot('after-submit-update-pilih-produk');
    });
   
});