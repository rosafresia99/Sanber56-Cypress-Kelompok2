// Edit Account Information & Edit Addressess
// by: moulinayuliana

describe('Editing Accounts - Positive TC', () => {

  beforeEach(function() {
    cy.fixture('newUser.json').then((data) => {
        this.userData = data;
    });

    cy.fixture('editUser.json').then((data) => {
      this.editUser = data;
    });
  });

  it('Successfully Edits Account with Fullfilled Information', function() { 
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    cy.get('#email').type(this.userData.email_address); 
    cy.get('#pass').type(this.userData.password); 
    cy.get('#send2').click(); 
   
    // Edits account details - Name
    cy.contains('Edit').click(); 
    cy.get('#firstname', { timeout: 10000 }).clear().type(this.editUser.firstname);
    cy.get('#lastname').clear().type(this.editUser.lastname)
    cy.contains('Save').click() 
    cy.contains('You saved the account information.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-name');

  // Edits account details - Email
    cy.contains('Edit').click(); 
    cy.get('#change-email').click()
    cy.get('#email').clear().type(this.editUser.email_addressNew)
    cy.get('#current-password').type(this.editUser.passwordOld)
    cy.contains('Save').click()
    cy.contains('You saved the account information.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-email');

    // Edits account details - Password, with new email
    cy.get('#email').type(this.userData.email_addressNew);
    cy.get('#pass').type(this.userData.password); 
    cy.get('#send2').click(); 
    cy.contains('Edit').click(); 
    cy.get('#change-password').click()
    cy.get('#current-password').type(this.editUser.passwordOld)
    cy.get('#password').type(this.editUser.passwordNew)
    cy.get('#password-confirmation').type(this.editUser.passwordConfirmationNew)
    cy.contains('Save').click() 
    cy.contains('You saved the account information.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-password');

    // Verify login with new password
    cy.get('#email').type(this.userData.email_addressNew); 
    cy.get('#pass').type(this.userData.passwordNew); 
    cy.get('#send2').click();
    cy.contains('Welcome,'); 
    cy.screenshot('login-with-new-password');
  });
 })




describe('Editing Accounts - Negative TC', () => {

  beforeEach(function() {
    cy.fixture('newUser.json').then((data) => {
        this.userData = data;
    });

    cy.fixture('editUser.json').then((data) => {
      this.editUser = data;
    });
  });

  it('Failed Edits Account with Unfilled Information', function() { 
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    cy.get('#email').type(this.userData.email_addressNew); 
    cy.get('#pass').type(this.userData.passwordNew); 
    cy.get('#send2').click(); 
   
    // Edits account details - Name
    cy.contains('Edit').click(); 
    cy.get('#firstname', { timeout: 10000 }).clear();
    cy.get('#lastname').clear();
    cy.contains('Save').click() 
    cy.contains('This is a required field.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('unedited-name');

  // Edits account details - Email
    cy.get('#change-email').click()
    cy.get('#email').clear()
    cy.get('#current-password')
    cy.contains('Save').click() 
    cy.contains('This is a required field.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('unedited-email');

    // Edits account details - Password, with new email
    cy.get('#change-password').click()
    cy.get('#current-password').click()
    cy.get('#password').click()
    cy.get('#password-confirmation').click()
    cy.contains('Save').click() 
    cy.contains('This is a required field.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('unedited-password');

  });
 })




describe('Editing Accounts - Negative TC', () => {

  beforeEach(function() {
    cy.fixture('newUser.json').then((data) => {
        this.userData = data;
    });

    cy.fixture('editUser.json').then((data) => {
      this.editUser = data;
    });
  });

  it('Failed Edits Account with Invalid Inputs', function() { 
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    cy.get('#email').type(this.userData.email_addressNew); 
    cy.get('#pass').type(this.userData.passwordNew); 
    cy.get('#send2').click(); 
   
    // Failed edit email with invalid password
    cy.contains('Edit').click(); 
    cy.get('#change-email').click()
    cy.get('#email').clear().type(this.editUser.email_addressNew)
    cy.get('#current-password').type(this.editUser.passwordOld)
    cy.contains('Save').click() 
    cy.contains("The password doesn't match this account. Verify the password and try again.", { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-email-with-invalid-password');

    // Failed edit password with invalid password
    cy.get('#change-password').click()
    cy.get('#current-password').type(this.editUser.wrongpassword)
    cy.get('#password').type(this.editUser.passwordNew)
    cy.get('#password-confirmation').type(this.editUser.passwordConfirmationNew)
    cy.contains('Save').click() 
    cy.contains("The password doesn't match this account. Verify the password and try again.", { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-newpassword-with-invalid-password');

  // Failed edit password with minimal length
    cy.get('#change-password').click()
    cy.get('#current-password').type(this.editUser.passwordNew)
    cy.get('#password').type(this.editUser.minpassword)
    cy.get('#password-confirmation').type(this.editUser.minpassword)
    cy.contains('Save').click() 
    cy.contains('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-newpassword-with-minimal-length');

    // Failed edit password with invalid confirmation password
    cy.get('#current-password').clear().type(this.editUser.passwordNew)
    cy.get('#password').clear().type(this.editUser.passwordnewest)
    cy.get('#password-confirmation').clear().type(this.editUser.invalidconfirmation)
    cy.contains('Save').click() 
    cy.contains('Please enter the same value again.', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-newpassword-with-invalid-confirmation');
  });
 })




 describe('Editing Addresses - Positive TC', () => {

  beforeEach(function() {
    cy.fixture('newUser.json').then((data) => {
        this.userData = data;
    });

    cy.fixture('editAddress.json').then((data) => {
      this.editAddress = data;
    });
  });

  it('Successfully Edits Addresses with Fullfilled Information', function() { 
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    cy.get('#email').type(this.userData.email_addressNew); 
    cy.get('#pass').type(this.userData.passwordNew); 
    cy.get('#send2').click(); 
   
    // Edits Billing Address
    cy.contains('Manage Addresses').click(); 
    cy.contains('Change Billing Address').click(); 
    cy.get('#company', { timeout: 10000 }).clear().type(this.editAddress.company);
    cy.get('#telephone').clear().type(this.editAddress.telephone)
    cy.get('#street_1').clear().type(this.editAddress.street_1)
    cy.get('#street_2').clear().type(this.editAddress.street_2)
    cy.get('#street_3').clear().type(this.editAddress.street_3)
    cy.get('#city').clear().type(this.editAddress.city)
    cy.get('#region').clear().type(this.editAddress.region)
    cy.get('#zip').clear().type(this.editAddress.zip)

    cy.contains('Save Address').click() 
    cy.contains('You saved the address.', { timeout: 50000 }).should('be.visible');
    cy.contains('Kesanber IKN', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-billing-address');

    // Edits Shipping Address
    cy.contains('Change Shipping Address').click(); 
    cy.get('#company', { timeout: 10000 }).clear().type(this.editAddress.company);
    cy.get('#telephone').clear().type(this.editAddress.telephone)
    cy.get('#street_1').clear().type(this.editAddress.street_1)
    cy.get('#street_2').clear().type(this.editAddress.street_2)
    cy.get('#street_3').clear().type(this.editAddress.street_3)
    cy.get('#city').clear().type(this.editAddress.city)
    cy.get('#region').clear().type(this.editAddress.region)
    cy.get('#zip').clear().type(this.editAddress.zip)

    cy.contains('Save Address').click() 
    cy.contains('You saved the address.', { timeout: 50000 }).should('be.visible');
    cy.contains('Kesanber IKN', { timeout: 50000 }).should('be.visible');
    cy.screenshot('edited-shipping-address');

  });
 })




 describe('Editing Addresses - Positive TC', () => {

  beforeEach(function() {
    cy.fixture('newUser.json').then((data) => {
        this.userData = data;
    });

    cy.fixture('addNewAddress.json').then((data) => {
      this.addNewAddress = data;
    });
  });

  it('Successfully Add New Address with Fullfilled Information', function() { 
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    cy.get('#email').type(this.userData.email_addressNew); 
    cy.get('#pass').type(this.userData.passwordNew); 
    cy.get('#send2').click(); 
   
    // Edits Billing Address
    cy.contains('Manage Addresses').click(); 
    cy.contains('Add New Address').click(); 
    cy.get('#company', { timeout: 10000 }).clear().type(this.addNewAddress.company);
    cy.get('#telephone').clear().type(this.addNewAddress.telephone)
    cy.get('#street_1').clear().type(this.addNewAddress.street_1)
    cy.get('#street_2').clear().type(this.addNewAddress.street_2)
    cy.get('#street_3').clear().type(this.addNewAddress.street_3)
    cy.get('#country').select('Indonesia')
    cy.get('#city').clear().type(this.addNewAddress.city)
    cy.get('#region').type(this.addNewAddress.region)
    cy.get('#zip').clear().type(this.addNewAddress.zip)

    cy.contains('Save Address').click() 
    cy.contains('You saved the address.', { timeout: 50000 }).should('be.visible');
    cy.contains('Ex Ibu Kota Negara', { timeout: 50000 }).should('be.visible');
    cy.screenshot('addnew-address');


  });
 })




 describe('Editing Addresses - Negative TC', () => {

  beforeEach(function() {
    cy.fixture('newUser.json').then((data) => {
        this.userData = data;
    });

    cy.fixture('editAddress.json').then((data) => {
      this.editAddress = data;
    });
  });

  it('Failed Edits Addresses with Unfilled Information', function() { 
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    cy.get('#email').type(this.userData.email_addressNew); 
    cy.get('#pass').type(this.userData.passwordNew); 
    cy.get('#send2').click(); 
   
    // Edits Addresses with Empty Fields
    cy.contains('Manage Addresses').click(); 
    cy.contains('Change Billing Address').click(); 
    cy.get('#company', { timeout: 10000 }).clear();
    cy.get('#telephone').clear();
    cy.get('#street_1').clear();
    cy.get('#street_2').clear();
    cy.get('#street_3').clear();
    cy.get('#city').clear();
    cy.get('#region').clear();
    cy.get('#zip').clear();

    cy.contains('Save Address').click() 
    cy.get('body').then($body => {
      if ($body.find('div:contains("This is a required field.")').length > 0) {
        cy.contains('This is a required field.', { timeout: 100 }).should('be.visible');
      } else if ($body.find('div:contains("One or more input exceptions have occurred.")').length > 0) {
        cy.contains('One or more input exceptions have occurred.', { timeout: 100 }).should('be.visible');
      } else {
        throw new Error('Expected error message not found');
      }
    });    cy.screenshot('error-empty-fields-address');


  });
 })