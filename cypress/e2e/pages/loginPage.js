class LoginPage {
    elements = {
        username: () => cy.get('[data-test="username"]'),
        password: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        loginCredentialsContainer: () => cy.get('[data-test="login-credentials-container"]'),
    };


}

export default new LoginPage();