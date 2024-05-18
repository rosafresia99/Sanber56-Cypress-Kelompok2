// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addProductToCart', (productName) => {
    //cy.visit('/');
    cy.get(':nth-child(5) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
    cy.get('#product-addtocart-button').click();
    cy.wait(3000); // Wait for 2 seconds
    cy.get('.showcart').scrollIntoView().click();
  });

Cypress.Commands.add('viewCart', (productName) => {
    console.log("I am here...")
    //cy.get(':nth-child(7) > .secondary > .action > span').click();
    cy.get('span[data-bind="i18n: \'View and Edit Cart\'"]')
      .should('be.visible')
      .click({ force: true });
    
  });

Cypress.Commands.add('proceedToCheckout', (productName) => {
    cy.get('.checkout-methods-items > :nth-child(1) > .action > span').click();
    // cy.get('.block-content > :nth-child(4)').click();
  });
  
  