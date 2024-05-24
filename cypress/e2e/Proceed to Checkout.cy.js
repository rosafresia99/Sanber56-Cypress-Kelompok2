import CheckoutPage from '../pages/CheckoutPage';

describe('Magento Checkout without Login', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.fixture('shippingDetails').as('details');
  });

  it('proceeds through checkout process without login', function() {
    cy.visit('/');
    cy.addProductToCart(); // replace 'Product Name' with the actual product name
    cy.viewCart();
    cy.proceedToCheckout();
    checkoutPage.visit();
    checkoutPage.fillShippingDetails(this.details);
    checkoutPage.submit();
    // Add assertions to verify order confirmation
    cy.elemContains('Thank you for your purchase');
  });
});


describe('Proceed to Cart - Negative Test Cases', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.fixture('shippingDetails').as('details');
  });

  it('should not allow proceeding to checkout with an empty cart', () => {
    // Navigate to the cart page
    cy.visit('/');
    
    // Attempt to proceed to checkout
    cy.get('.showcart').scrollIntoView().click();
    
    // Assert that the appropriate message is displayed
    cy.elemContains('You have no items in your shopping cart.')
  });
  
  it('should not allow proceeding to checkout with invalid item quantity', () => {
    // Add an item with invalid quantity to the cart
    cy.visit('/');
    cy.addProductToCart();
    cy.viewCart();
    cy.get('.action-edit').click();
    cy.wait(3000)
    cy.get('#qty', { timeout: 20000 })
    .should('be.visible') // Ensure it's visible
    .clear() // Clear the existing value
    .type('0') // Set the quantity to 0
    .should('have.value', '0'); // Verify the value is set to 0
 
    cy.get('#product-updatecart-button').click();
    cy.elemContains('Please enter a','#qty-error')
  });
});

