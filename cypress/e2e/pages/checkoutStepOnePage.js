class CheckoutStepOnePage {
    constructor() {
        this.elements = {
            cartTitle: () => cy.get('[data-test="title"]'),
            firstNameInput: () => cy.get('[data-test="firstName"]'),
            lastNameInput: () => cy.get('[data-test="lastName"]'),
            postalCodeInput: () => cy.get('[data-test="postalCode"]'),
            continueButton: () => cy.get('[data-test="continue"]'),
            cancelButton: () => cy.get('[data-test="cancel"]'),
            errorMessage: () => cy.get('[data-test="error"]'),
        }
    };
}

export default new CheckoutStepOnePage();