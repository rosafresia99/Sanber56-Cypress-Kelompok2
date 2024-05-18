class CheckoutPage {
    visit() {
      cy.visit('/checkout/#shipping');
    }
  
    fillShippingDetails(details) {
      cy.get('#customer-email-fieldset > .required > .control > #customer-email').type(details.emailUser);
      cy.get('input[name="firstname"]').type(details.firstName);
      cy.get('input[name="lastname"]').type(details.lastName);
      cy.get('input[name="street[0]"]').type(details.street);
      cy.get('input[name="city"]').type(details.city);
      cy.get('select[name="region_id"]').select(details.region);
      cy.get('input[name="postcode"]').type(details.postcode);
      cy.get('input[name="telephone"]').type(details.telephone);
      cy.get(':nth-child(1) > :nth-child(1) > .radio').click()
    }
  
    submit() {
        cy.get('.button > span').click();
        cy.get('.payment-method-content > :nth-child(4) > div.primary > .action > span').click()
    }
  }
  
  export default CheckoutPage;

  