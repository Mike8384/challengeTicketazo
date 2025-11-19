import { generarEmail, generarTelefono, generarCUIT } from '../utils/generators'


describe('template spec', () => {

  beforeEach(() => {
        cy.visit('/auth/registerClient') //viene del base url configurado en cypress.config.js
    });

  it('1- Registro exitoso', () => {

      cy.fixture('register.ok.json').then((cliente) => {
    
      cliente.CUIT = generarCUIT()
      cliente.telefono = generarTelefono()
      cliente.email = generarEmail()
      cliente.confirmarEmail = cliente.email
      cy.registroCte(cliente)//llamo al commands
      //registrarse
      cy.get('[data-cy="btn-registrarse"]').click()
      // validar retorno a home
      cy.url().should('include', '/auth/login')
      //validar boton del login
      cy.contains('Login').should('be.visible')
    })

  })
})