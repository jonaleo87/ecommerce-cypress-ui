const loginPage = require('../page-objects/loginPage');

describe('Login Tests', () => {
  beforeEach(() => {
    loginPage.navigate();
  });

  it('should login with valid credentials', () => {
    loginPage.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('should show error for invalid login', () => {
    loginPage.login('invalid_user', 'wrong_password');
    loginPage.validateErrorMessage('Epic sadface: Username and password do not match');
  });
});