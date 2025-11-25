describe('template spec', () => {
    beforeEach(() => {
        cy.visit('/auth/login') //viene del base url configurado en cypress.config.js
    });
    it('8. Login exitoso', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {...data.loginOk}
        cy.Login(cliente)//llamo al commands
        cy.url().should('eq', 'https://ticketazo.com.ar/')
        cy.get('input[placeholder="Busca tu próxima función!"]').should('be.visible')
        })
    })
        it('9. Login invalido', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {...data.invalidCredentials}
        cy.Login(cliente)//llamo al commands
        cy.get('[data-cy="error-message"]').should('contain.text', 'Correo o contraseña incorrectos')

        })
    })


})