describe('Login - Email inválido', () => {

    beforeEach(() => {
        cy.visit('/auth/login');
        cy.fixture('registerInvalido').as('dataInvalid');
    });

    it('Login con formato de email inválido', function () {
        const user = this.dataInvalid.invalidEmail;

        cy.get('[data-cy="input-email"]').type(user.email);
        cy.get('[data-cy="input-password"]').type(user.password);

        cy.get('[data-cy="btn-login"]').click();

        // Validar mensaje de email inválido
        cy.get('div[data-slot="error-message"]')
            .should('be.visible')
            .invoke('text')
            .should('match', /@|válido/i);

        cy.url().should('include', '/auth/login');
    });
});

