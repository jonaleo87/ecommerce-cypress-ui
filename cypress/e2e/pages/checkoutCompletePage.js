class CheckoutCompletePage {
    constructor() {
        this.elements = {
            cartTitle: () => cy.get('[data-test="title"]'),
            completeHeader: () => cy.get('[data-test="complete-header"]'),
            completeText: () => cy.get('[data-test="complete-text"]'),
            buttonBackHome: () => cy.get('[data-test="back-to-products"]'),

        }
    };
}

export default new CheckoutCompletePage();