/// <reference types="cypress"/>
import LoginPage from '../pages/loginPage';



describe('Login Tests 1', () => {
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

  it('TC03| Validar que se visualice el mensaje de error con credenciales incorrectas', () => {
    LoginPage.elements.username().type(Cypress.env('INVALID_USER'));
    LoginPage.elements.password().type(Cypress.env('INVALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('TC04| Validar que no permite iniciar sesion con campos vacíos (sin completar usuario/contraseña)', () => {
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Username is required');
    LoginPage.elements.username().type(Cypress.env('VALID_USER'));
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Password is required');
  });

  it('TC05| Validar que se visualice el mensaje de error con usuario bloqueado', () => {
    LoginPage.elements.username().type('locked_out_user');
    LoginPage.elements.password().type(Cypress.env('VALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('TC06| Validar que al hacer logout no permite redirecciónar sin volver a loguear', () => {
    cy.login()
    cy.url().should('include', 'inventory.html');
    cy.title().should('eq', 'Swag Labs');
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.visit('https://www.saucedemo.com/inventory.html', { failOnStatusCode: false });
    cy.url().should('eq', 'https://www.saucedemo.com/');
  });


  it('TC07| Validar que el login no permite una Injection SQL / Datos especiales', () => {
    const sqlInjection = "' OR '1'='1";
    LoginPage.elements.username().type(sqlInjection);
    LoginPage.elements.password().type(sqlInjection);
    LoginPage.elements.loginButton().click();
    LoginPage.elements.errorMessage().should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

});