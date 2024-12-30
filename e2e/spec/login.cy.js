// import { utilities } from '../utilities/utilities';
// import { LoginPage } from '../pages/loginPage';

describe('Login Tests', () => {
  // beforeEach(() => {
  //   utilities.navigate();
  // });

  it('TC01| Validar poder iniciar sesion correctamente', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test=username]').type('standard_user');
    LoginPage.username.type(Cypress.env('VALID_USER'));
    LoginPage.username().type(Cypress.env('VALID_USER'));
    LoginPage.password().type(Cypress.env('VALID_PASSWORD'));
    LoginPage.loginButton().click();



    // cy.get('#user-name').type(Cypress.env('VALID_USER'));
    // cy.get('#password').type(Cypress.env('VALID_PASSWORD'));
    // cy.get('#login-button').click();
  });

});