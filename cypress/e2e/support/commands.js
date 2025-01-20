// Este archivo define comandos personalizados que se pueden utilizar en las pruebas para simplificar y reutilizar código.
import LoginPage from '../pages/loginPage';
import ProductsPage from '../pages/productsPage';


Cypress.Commands.add('navigate', () => {
    cy.visit('https://www.saucedemo.com');
});

Cypress.Commands.add('navigateInventory', () => {
    cy.visit('https://www.saucedemo.com/inventory.html', { failOnStatusCode: false });
});

Cypress.Commands.add('login', () => {
    LoginPage.elements.username().type(Cypress.env('VALID_USER'));
    LoginPage.elements.password().type(Cypress.env('VALID_PASSWORD'));
    LoginPage.elements.loginButton().click();
});

Cypress.Commands.add('add3ProductsToCart', () => {
    ProductsPage.elements.productCard().each(($card, index) => {
        if (index < 3) {
            cy.wrap($card).within(() => {
                ProductsPage.elements.productAddToCartButton().click();
            });
        }
    });
});