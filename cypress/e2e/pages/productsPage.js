class ProductsPage {
    constructor() {
        this.elements = {
            productCard: () => cy.get('[data-test="inventory-item"]'),
            productName: () => cy.get('[data-test="inventory-item-name"]'),
            productDescription: () => cy.get(`[data-test="inventory-item"]:nth-child(${index}) [data-test="inventory-item-desc"]`),
            productPrice: () => cy.get(`[data-test="inventory-item-price"]`),
            productAddToCartButton: (index) => cy.get(`[data-test="inventory-item"]:nth-child(${index}) [data-test="add-to-cart-sauce-labs-backpack"]`),
            productLinkDetail: (index) => cy.get(`[data-test="inventory-item"]:nth-child(${index}) [data-test="inventory-item-link"]`),
            productImage: (index) => cy.get(`[data-test="inventory-item"]:nth-child(${index}) [data-test="inventory-item-img"]`),

            filterDropdown: () => cy.get('[data-test="product-sort-container"]'),

            cartIcon: () => cy.get('[data-test="shopping_cart_link"]'),
            cartBadge: () => cy.get('[data-test="shopping_cart_badge"]'),
            burgerMenu: () => cy.get('[data-test="react-burger-menu-btn"]'),
            closeMenuButton: () => cy.get('[data-test="react-burger-cross-btn"]'),
            menuAllItems: () => cy.get('[data-test="inventory_sidebar_link"]'),
            menuAbout: () => cy.get('[data-test="about_sidebar_link"]'),
            menuLogout: () => cy.get('[data-test="logout_sidebar_link"]'),
            menuResetAppState: () => cy.get('[data-test="reset_sidebar_link"]'),
        }
    }
}

export default new ProductsPage();