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

  it.only('TC03| Persistencia de sesión', () => {
    //Hay que implementar el cy.session para que se mantenga la sesion
    LoginPage.elements.username().type(Cypress.env('VALID_USER'));
    LoginPage.elements.password().type(Cypress.env('VALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
    cy.url().should('include', 'inventory.html');
    cy.title().should('eq', 'Swag Labs');
    cy.reload();
    cy.url().should('include', 'inventory.html');
    cy.title().should('eq', 'Swag Labs');
    cy.visit('https://www.saucedemo.com/inventory.html');
    cy.url().should('include', 'inventory.html');
    cy.title().should('eq', 'Swag Labs');
  });

  it('TC04| Error con credenciales incorrectas', () => {
    LoginPage.elements.username().type(Cypress.env('INVALID_USER'));
    LoginPage.elements.password().type(Cypress.env('INVALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Username and password do not match any user in this service.');
  });

  it('TC05| Campos vacíos (sin completar usuario/contraseña)', () => {
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Username is required.');
    LoginPage.elements.username().type(Cypress.env('VALID_USER'));
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Password is required.');
  });

  it('TC06| Error con usuario bloqueado', () => {
    LoginPage.elements.username().type('locked_out_user');
    LoginPage.elements.password().type(Cypress.env('VALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('TC07| Campos exceden longitud permitida', () => {
    const longString = 'a'.repeat(256);
    LoginPage.elements.username().type(longString);
    LoginPage.elements.password().type(longString);
    LoginPage.elements.loginButton().click();
    LoginPage.elements.username().should('have.value', longString.substring(0, 255));
    LoginPage.elements.password().should('have.value', longString.substring(0, 255));
  });

});