describe('Login - Caso exitoso', () => {
    beforeEach( () => {      
        cy.visit('/auth/login')
    });

    it('09. Login exitoso', function () {
        cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {... data.loginOk}
        cy.Login(cliente)
        })
    })
})
    

