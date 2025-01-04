// Este archivo define comandos personalizados que se pueden utilizar en las pruebas para simplificar y reutilizar código.


Cypress.Commands.add('navigate', () => {
    cy.visit('https://www.saucedemo.com');
});