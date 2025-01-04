/// <reference types="cypress"/>
import LoginPage from '../pages/loginPage';



describe('Login Tests', () => {
  beforeEach(() => {
    cy.navigate();
  });

  it('TC01| Validar que se visualicen los elementos del login', () => {
    LoginPage.elements.loginCredentialsContainer().should('be.visible');
    LoginPage.elements.username().should('be.visible');
    LoginPage.elements.password().should('be.visible');
    LoginPage.elements.loginButton().should('be.visible');
  });

  it('TC02| Validar poder iniciar sesion correctamente', () => {
    LoginPage.elements.username().type(Cypress.env('VALID_USER'));
    LoginPage.elements.password().type(Cypress.env('VALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
    cy.url().should('include', 'inventory.html');
    cy.title().should('eq', 'Swag Labs');
  });

});