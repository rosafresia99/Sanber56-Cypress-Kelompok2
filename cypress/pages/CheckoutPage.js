class CheckoutPage {
    visit() {
      cy.visit('/checkout/#shipping');
    }
  
    fillShippingDetails(details) {
      cy.get('input[name="firstname"]').type(details.firstName);
      cy.get('input[name="lastname"]').type(details.lastName);
      cy.get('input[name="street[0]"]').type(details.street);
      cy.get('input[name="city"]').type(details.city);
      cy.get('select[name="region_id"]').select(details.region);
      cy.get('input[name="postcode"]').type(details.postcode);
      cy.get('input[name="telephone"]').type(details.telephone);
    }
  
    submit() {
      cy.get('button[title="Place Order"]').click();
    }
  }
  
  export default CheckoutPage;

  