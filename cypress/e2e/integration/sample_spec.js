// Este archivo contiene las pruebas para el proceso de inicio de sesión, verificando que los usuarios puedan acceder correctamente a la aplicación.

describe('Pruebas de inicio de sesión', () => {
    it('Debería permitir a un usuario iniciar sesión con credenciales válidas', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('usuarioEjemplo');
        cy.get('input[name="password"]').type('contraseñaEjemplo');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Bienvenido, usuarioEjemplo');
    });

    it('Debería mostrar un mensaje de error con credenciales inválidas', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('usuarioInvalido');
        cy.get('input[name="password"]').type('contraseñaIncorrecta');
        cy.get('button[type="submit"]').click();
        cy.contains('Credenciales inválidas');
    });
});