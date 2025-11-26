describe('Cargar evento', () => {
  beforeEach(() => {
    cy.visit('/auth/login') //viene del base url configurado en cypress.config.js
    cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {...data.loginOk}
        cy.LoginExito(cliente)
        })
    });

it('1.Crear evento único', () => {
    cy.createUniqueEvent() //llamo al commands y fixtures desde jCommands.js y loadEvent.json
})
    
})