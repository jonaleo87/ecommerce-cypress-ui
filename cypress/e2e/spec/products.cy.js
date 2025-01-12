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
        // Verificar que al menos un producto esté visible en la página
        ProductsPage.elements.productList().should('be.exist');

        // Verificar que cada producto tenga un nombre, una imagen y un precio visible
        ProductsPage.elements.productList().each(($el, index) => {
            ProductsPage.elements.productName(index + 1).should('be.visible');
            ProductsPage.elements.productImage(index + 1).should('be.visible');
            ProductsPage.elements.productPrice(index + 1).should('be.visible');
        });
    });

});