


class Utilities {

    navigate() {
        cy.visit('https://www.saucedemo.com/');
    }

    login(username, password) {
        this.elements.username().type(username);
        this.elements.password().type(password);
        this.elements.loginButton().click();
    }

    validateErrorMessage(expectedMessage) {
        this.elements.errorMessage().should('contain.text', expectedMessage);
    }


}
export default new Utilities();