describe('Logout - Caso exitoso', () => {

    beforeEach(() => {
        cy.visit('/auth/login')
        cy.fixture('registerCteEvent.json').then((data) => {
            cy.wrap(data.loginOk).as('cliente')
        })
    })

    it('El usuario puede cerrar sesión correctamente', function () {

        cy.LoginExito(this.cliente)  
        cy.logout()
    })
})
