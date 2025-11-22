describe('template spec', () => {
    beforeEach(() => {
        cy.visit('/auth/login') //viene del base url configurado en cypress.config.js
    });
    it('8. Login exitoso', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {...data.loginOk}
        cy.LoginExito(cliente)//llamo al commands
        })
    })
})