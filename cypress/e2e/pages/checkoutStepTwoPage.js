class CheckoutStepTwoPage {
    constructor() {
        this.elements = {
            cartTitle: () => cy.get('[data-test="title"]'),
            cartItem: () => cy.get('data-test="inventory-item"'),
            cartItemName: () => cy.get('[data-test="inventory-item-name"]'),
            cartItemDesc: () => cy.get('[data-test="inventory-item-desc"]'),
            cartItemPrice: () => cy.get('[data-test="inventory-item-price"]'),
            cartItemQuantity: () => cy.get('[data-test="item-quantity"]'),
            cartPaymentInformation: () => cy.get('data-test="payment-info-label"'),
            cartPaymentInfoValue: () => cy.get('data-test="payment-info-value"'),
            cartShippingInformation: () => cy.get('data-test="shipping-info-label"'),
            cartShippingInfoValue: () => cy.get('data-test="shipping-info-value"'),
            cartSummaryTotal: () => cy.get('data-test="total-info-label"'),
            cartSummarySubtotal: () => cy.get('[data-test="subtotal-info-label"]'),
            cartSummaryTax: () => cy.get('[data-test="tax-label"]'),
            cartSummaryInfo: () => cy.get('[data-test="total-label"]'),
            finishButton: () => cy.get('[data-test="finish"]'),
            cancelButton: () => cy.get('[data-test="cancel"]'),
        }
    };
}

export default new CheckoutStepTwoPage();