import ProductsPage from '../pages/productsPage';

describe('Product Tests', () => {
    // Crear la sesión inicial
    before(() => {
        cy.session('loginSession', () => {
            cy.navigate();
            cy.login();
            cy.getCookie('session-username').then((cookie) => {
                Cypress.env('SESSION_USERNAME_COOKIE', cookie.value);
            });
        });
    });

    // Restaurar la sesión antes de cada prueba
    beforeEach(() => {
        cy.setCookie('session-username', Cypress.env('SESSION_USERNAME_COOKIE'));
        cy.navigateInventory();
    });

    it('TC01| Validar que se visualicen correctamente todos los productos correctamente', () => {
        ProductsPage.elements.productCard().should('have.length.gte', 6)
        ProductsPage.elements.productCard().each(($card, index) => {
            cy.wrap($card).should('be.visible');
            cy.wrap($card).find('[data-test="inventory-item-name"]').should('be.visible');
            cy.wrap($card).find('[data-test="inventory-item-desc"]').should('be.visible');
            cy.wrap($card).find('[data-test="inventory-item-price"]').should('be.visible');
            cy.wrap($card).find('button').contains('Add to cart').should('be.visible');
        });
    });

    it('TC02| Verificar que el orden inicial de los productos sea consistente', () => {
        const productNames = [];
        ProductsPage.elements.productName().each(($el) => {
            productNames.push($el.text());
        }).then(() => {
            const sortedProductNames = [...productNames].sort();
            expect(productNames).to.deep.equal(sortedProductNames);
        });
    });

    it('TC03| Ordenar por nombre (A-Z)', () => {
        // Seleccionar la opción de ordenar por nombre (A-Z)
        ProductsPage.elements.filterDropdown().select('az');

        // Obtener los nombres de los productos y verificar que estén en orden alfabético (A-Z)
        const productNames = [];
        ProductsPage.elements.productName().each(($el) => {
            productNames.push($el.text());
        }).then(() => {
            const sortedProductNames = [...productNames].sort();
            expect(productNames).to.deep.equal(sortedProductNames);
        });
    });

    it('TC04| Ordenar por nombre (Z-A)', () => {
        // Seleccionar la opción de ordenar por nombre (Z-A)
        ProductsPage.elements.filterDropdown().select('za');

        // Obtener los nombres de los productos y verificar que estén en orden alfabético inverso (Z-A)
        const productNames = [];
        ProductsPage.elements.productName().each(($el) => {
            productNames.push($el.text());
        }).then(() => {
            const sortedProductNames = [...productNames].sort().reverse();
            expect(productNames).to.deep.equal(sortedProductNames);
        });
    });

    it('TC05| Ordenar por precio (Low to High)', () => {
        // Seleccionar la opción de ordenar por precio (Low to High)
        ProductsPage.elements.filterDropdown().select('lohi');

        // Obtener los precios de los productos y verificar que estén en orden de menor a mayor
        const productPrices = [];
        ProductsPage.elements.productPrice().each(($el) => {
            productPrices.push(parseFloat($el.text().replace('$', '')));
        }).then(() => {
            const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).to.deep.equal(sortedProductPrices);
        });
    });

    it('TC06| Ordenar por precio (High to Low)', () => {
        // Seleccionar la opción de ordenar por precio (High to Low)
        ProductsPage.elements.filterDropdown().select('hilo');

        // Obtener los precios de los productos y verificar que estén en orden de mayor a menor
        const productPrices = [];
        ProductsPage.elements.productPrice().each(($el) => {
            productPrices.push(parseFloat($el.text().replace('$', '')));
        }).then(() => {
            const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
            expect(productPrices).to.deep.equal(sortedProductPrices);
        });
    });

});