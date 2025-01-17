class CartPage {
    constructor() {
        this.elements = {
            cartTitle: () => cy.get('[data-test="title"]'),
            cartItem: () => cy.get('data-test="inventory-item"'),
            cartItemName: () => cy.get('[data-test="inventory-item-name"]'),
            cartItemDesc: () => cy.get('[data-test="inventory-item-desc"]'),
            cartItemPrice: () => cy.get('[data-test="inventory-item-price"]'),
            cartItemQuantity: () => cy.get('[data-test="item-quantity"]'),
            cartItemRemoveButton: () => cy.get('button').contains('Remove'),
            cartCheckoutButton: () => cy.get('[data-test="checkout"]'),
            cartContinueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
        }
    };
}

export default new CartPage();
