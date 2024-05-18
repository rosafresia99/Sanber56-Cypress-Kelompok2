Cypress.Commands.add('addProductToCart', () => {
    //cy.visit('/');
    cy.get(':nth-child(5) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000); // Wait for 2 seconds
    cy.get('.showcart').scrollIntoView().click();
  });

Cypress.Commands.add('viewCart', () => {
    console.log("I am here...")
    //cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get('span[data-bind="i18n: \'View and Edit Cart\'"]')
      .should('be.visible')
      .click({ force: true });
    
  });

Cypress.Commands.add('proceedToCheckout', () => {
    cy.get('.checkout-methods-items > :nth-child(1) > .action > span').click();
  });

Cypress.Commands.add('elemContains', (text,selector ) => {
  cy.wait(3000)
  if (selector != undefined) {
    cy.get(selector).contains(text).should('be.visible');
  } else {
    cy.contains(text);
  }
});

