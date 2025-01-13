import ProductsPage from '../pages/productsPage';

describe('Product Tests', () => {
    // Crear la sesión inicial
    before(() => {
        cy.session('loginSession', () => {
            cy.navigate();
            cy.login();
        });
    });

    // Restaurar la sesión antes de cada prueba
    beforeEach(() => {
        cy.navigateInventory();
    });

    it('TC01| Validar que se visualicen correctamente todos los productos correctamente', () => {


        // Iterar sobre todas las cards de productos
        ProductsPage.elements.productCard().each(($card, index) => {
            cy.wrap($card).should('be.visible');
            cy.wrap($card).find('[data-test="inventory-item-name"]').should('be.visible');
            cy.wrap($card).find('[data-test="inventory-item-desc"]').should('be.visible');
            cy.wrap($card).find('[data-test="inventory-item-price"]').should('be.visible');
            cy.wrap($card).find('button').contains('Add to cart').should('be.visible');
        });
    });

});