const loginPage = require('../page-objects/loginPage');
const productsPage = require('../page-objects/productsPage');

describe('Product Tests', () => {
    before(() => {
        loginPage.navigate();
        loginPage.login('standard_user', 'secret_sauce');
    });

    it('should display product and add it to the cart', () => {
        productsPage.validateProductDisplayed('Sauce Labs Backpack');
        productsPage.addToCart('Sauce Labs Backpack');
        cy.get('.shopping_cart_badge').should('contain', '1');
    });
});