// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registroCte', (cliente) => {
    if (cliente.razonSocial) {
        cy.get('[data-cy="input-razon-social"]').type(cliente.razonSocial)
    }
    if (cliente.CUIT) {
        cy.get('[data-cy="input-cuit"]').type(cliente.CUIT)
    }
    if (cliente.provincia) {
        cy.get('[data-cy="select-provincia"]').type(`${cliente.provincia}{enter}`)
    }
    if (cliente.localidad) {
        cy.get('[data-cy="select-localidad"]').type(`${cliente.localidad}{enter}`)
    }
    if (cliente.direccion) {
        cy.get('[data-cy="input-direccion"]').type(cliente.direccion)
    }
    if (cliente.telefono) {
        cy.get('[data-cy="input-telefono"]').type(cliente.telefono)
    }
    if (cliente.email) {
        cy.get('[data-cy="input-email"]').type(cliente.email)
    }
    if (cliente.confirmarEmail) {
        cy.get('[data-cy="input-confirmar-email"]').type(cliente.confirmarEmail)
    }
    if (cliente.password) {
        cy.get('[data-cy="input-password"]').type(cliente.password)
    }
    if (cliente.confirmarPassword) {
        cy.get('[data-cy="input-repetir-password"]').type(cliente.confirmarPassword)
    }
})

Cypress.Commands.add('validarErrorCampoVacio', (mensaje) => {
    cy.get('div[data-slot="error-message"]').should('contain.text', mensaje)
})


Cypress.Commands.add('LoginExito', (cliente) => {
    cy.get('[data-cy="input-email"]').type(cliente.email)
    cy.get('[data-cy="input-password"]').type(cliente.password)
    cy.get('[data-cy="btn-login"]').click()
    cy.url().should('eq', 'https://ticketazo.com.ar/')
    //cy.get('input[placeholder="Busca tu próxima función!"]').should('be.visible')
})

