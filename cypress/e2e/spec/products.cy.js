import ProductsPage from '../pages/productsPage';
import CartPage from '../pages/cartPage';
import CheckoutStepOnePage from '../pages/checkoutStepOnePage';
import CheckoutStepTwoPage from '../pages/checkoutStepTwoPage';
import CheckoutCompletePage from '../pages/checkoutCompletePage';
import { faker } from '@faker-js/faker';


describe('Product Tests', () => {
    before(() => {
        cy.session('loginSession', () => {
            cy.navigate();
            cy.login();
            cy.getCookie('session-username').then((cookie) => {
                Cypress.env('SESSION_USERNAME_COOKIE', cookie.value);
            });
        });
    });

    beforeEach(() => {
        cy.setCookie('session-username', Cypress.env('SESSION_USERNAME_COOKIE'));
        cy.navigateInventory();
        Cypress.env('firstName', faker.name.firstName());
        Cypress.env('lastName', faker.name.lastName());
        Cypress.env('postalCode', faker.address.zipCode());
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
        ProductsPage.elements.filterDropdown().select('az');
        const productNames = [];
        ProductsPage.elements.productName().each(($el) => {
            productNames.push($el.text());
        }).then(() => {
            const sortedProductNames = [...productNames].sort();
            expect(productNames).to.deep.equal(sortedProductNames);
        });
    });

    it('TC04| Ordenar por nombre (Z-A)', () => {
        ProductsPage.elements.filterDropdown().select('za');
        const productNames = [];
        ProductsPage.elements.productName().each(($el) => {
            productNames.push($el.text());
        }).then(() => {
            const sortedProductNames = [...productNames].sort().reverse();
            expect(productNames).to.deep.equal(sortedProductNames);
        });
    });

    it('TC05| Ordenar por precio (Low to High)', () => {
        ProductsPage.elements.filterDropdown().select('lohi');
        const productPrices = [];
        ProductsPage.elements.productPrice().each(($el) => {
            productPrices.push(parseFloat($el.text().replace('$', '')));
        }).then(() => {
            const sortedProductPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).to.deep.equal(sortedProductPrices);
        });
    });

    it('TC06| Ordenar por precio (High to Low)', () => {
        ProductsPage.elements.filterDropdown().select('hilo');
        const productPrices = [];
        ProductsPage.elements.productPrice().each(($el) => {
            productPrices.push(parseFloat($el.text().replace('$', '')));
        }).then(() => {
            const sortedProductPrices = [...productPrices].sort((a, b) => b - a);
            expect(productPrices).to.deep.equal(sortedProductPrices);
        });
    });


    it('TC07| Validar poder agregar y remover un producto al carrito desde una card', () => {
        ProductsPage.elements.productCard().first().within(() => {
            ProductsPage.elements.productAddToCartButton().click();
        });
        ProductsPage.elements.cartBadge().should('contain', '1');
        ProductsPage.elements.productCard().first().within(() => {
            cy.get('button').contains('Remove').click();
        });
        ProductsPage.elements.cartBadge().should('not.exist');
    });

    it('TC08| Validar poder agregar y remover todos los productos al carrito desde las cards', () => {
        ProductsPage.elements.productCard().each(($card) => {
            cy.wrap($card).within(() => {
                ProductsPage.elements.productAddToCartButton().click();
            });
        });
        ProductsPage.elements.cartBadge().should('contain', '6');
        ProductsPage.elements.productCard().each(($card) => {
            cy.wrap($card).within(() => {
                ProductsPage.elements.productRemoveButton().click();
            });
        });
        ProductsPage.elements.cartBadge().should('not.exist');
    });

    it('TC09| Verificar que los productos agregados al carrito se muestran correctamente en la página del carrito', () => {
        ProductsPage.elements.productCard().each(($card, index) => {
            if (index < 3) {
                cy.wrap($card).within(() => {
                    ProductsPage.elements.productAddToCartButton().click();
                });
            }
        });
        ProductsPage.elements.cartIcon().click();
        CartPage.elements.cartItem().should('have.length', 3);
        CartPage.elements.cartItemName().each(($el, index) => {
            cy.wrap($el).should('be.visible');
        });
    });

    it('TC10| Completar el proceso de compra exitosamente', () => {
        cy.add3ProductsToCart();
        ProductsPage.elements.cartIcon().click();
        CartPage.elements.cartCheckoutButton().click();
        CheckoutStepOnePage.elements.firstNameInput().type(Cypress.env('firstName'));
        CheckoutStepOnePage.elements.lastNameInput().type(Cypress.env('lastName'));
        CheckoutStepOnePage.elements.postalCodeInput().type(Cypress.env('postalCode'));
        CheckoutStepOnePage.elements.continueButton().click();
        CheckoutStepTwoPage.elements.cartItem().should('have.length', 3);
        CheckoutStepTwoPage.elements.cartSummaryTotal().should('be.visible');
        CheckoutStepTwoPage.elements.finishButton().click();
        CheckoutCompletePage.elements.completeHeader().should('contain', 'Thank you for your order!');
        CheckoutCompletePage.elements.buttonBackHome().click();
        cy.url().should('include', 'inventory.html');
        cy.title().should('eq', 'Swag Labs');
    });

});