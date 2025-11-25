describe('Logout - Caso exitoso', () => {

    beforeEach(() => {
        cy.visit('/auth/login');
        cy.fixture('registerCteEvent').as('data'); 
    });

    it('El usuario puede cerrar sesión correctamente', function () {

        const user = this.data.loginOk; 

        cy.LoginExito(user); 

        cy.logout();        
    });
});

