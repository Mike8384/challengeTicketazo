describe('Logout - Caso exitoso', () => {

    beforeEach(() => {
        cy.visit('/auth/login')
        cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {...data.loginOk}
        cy.LoginExito(cliente)//llamo al commands
        })
    })


})

