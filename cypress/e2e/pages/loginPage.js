class LoginPage {
    elements = {
        username: () => cy.get('#user-name'),
        password: () => cy.get('#password'),
        loginButton: () => cy.get('#login-button'),
        errorMessage: () => cy.get('h3[data-test="error"]'),
    };

    navigate() {
        cy.visit('/');
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

module.exports = new LoginPage();