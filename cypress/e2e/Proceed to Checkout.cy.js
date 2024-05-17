// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

import CheckoutPage from '../pages/CheckoutPage';

describe('Magento Checkout without Login', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.fixture('shippingDetails').as('details');
  });

  it('proceeds through checkout process without login', function() {
    cy.visit('/');
    cy.addProductToCart('Product Name'); // replace 'Product Name' with the actual product name
    checkoutPage.visit();
    checkoutPage.fillShippingDetails(this.details);
    checkoutPage.submit();
    // Add assertions to verify order confirmation
    cy.contains('Thank you for your purchase').should('be.visible');
  });
});

