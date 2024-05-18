// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

import CheckoutPage from '../pages/CheckoutPage';

// support/index.js or at the top of your test file
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent the error from failing the test
  return false;
});

describe('Proceed to Cart - Positive Test Cases', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.fixture('shippingDetails').as('details');
  });

  it('proceeds through checkout process without login', function() {
    cy.visit('/');
    cy.addProductToCart('Product Name'); // replace 'Product Name' with the actual product name
    cy.viewCart('Product Name');
    cy.proceedToCheckout('Product Name');
    checkoutPage.visit();
    checkoutPage.fillShippingDetails(this.details);
    checkoutPage.submit();
    
    // Add assertions to verify order confirmation
    cy.contains('Thank you for your purchase').should('be.visible');
  });
});


describe('Proceed to Cart - Negative Test Cases', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.fixture('shippingDetails').as('details');
  });

  it.only('should not allow proceeding to checkout with an empty cart', () => {
    // Navigate to the cart page
    cy.visit('/');
    
    // Attempt to proceed to checkout
    cy.viewCart('Product Name');
    
    // Assert that the appropriate message is displayed
    cy.contains('You have no items in your shopping cart.').should('be.visible');
  });
  
  it ('should not allow proceeding to checkout with invalid item quantity', () => {
    // Add an item with invalid quantity to the cart
    cy.visit('/');
    cy.addProductToCart('Product Name'); // replace 'Product Name' with the actual product name
    cy.viewCart('Product Name');
    // cy.get('.action-edit').click();
    cy.get('.action-edit', { timeout: 20000 }).click();
    cy.get('#qty', { timeout: 20000 })
    .should('be.visible') // Ensure it's visible
    .clear() // Clear the existing value
    .type('0') // Set the quantity to 0
    .should('have.value', '0'); // Verify the value is set to 0
 
    cy.get('#product-updatecart-button').click();

    // Assert that the appropriate message is displayed
    cy.get('#qty-error').contains("Please enter a");
  });
});

