class ProductsPage {
    elements = {
        productTitle: (productName) =>
            cy.contains('.inventory_item_name', productName),
        addToCartButton: (productName) =>
            cy.contains('.inventory_item_name', productName)
                .parent()
                .find('button'),
    };

    validateProductDisplayed(productName) {
        this.elements.productTitle(productName).should('be.visible');
    }

    addToCart(productName) {
        this.elements.addToCartButton(productName).click();
    }
}

module.exports = new ProductsPage();