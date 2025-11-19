import { generarDNI, generarEmail, generarTelefono, generarCUIT } from '../../utils/generators'


describe('Casos negativos', () => {
    beforeEach(() => {
        cy.visit('/auth/registerClient') //viene del base url configurado en cypress.config.js
    });
    it('Correo invalido', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            // Sobrescribo datos para que sean únicos o inválidos
            cliente.CUIT = generarCUIT()
            cliente.telefono = generarTelefono()
            cliente.email = "vero.com"  // correo inválido, sin '@'
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            // validar EMAIL
            cy.get('div[data-slot="error-message"]').invoke('text')
            .should('match', /Incluye un signo "@"|Please include an '@'/)
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

        it('Campos vacios', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.camposVacios}
            /*Campos vacios: razon social - cuit - provincia y localidad*/
            cliente.telefono = generarTelefono()
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.validarErrorCampoVacio('Completa este campo') /*todos tienen en mismo mensaje*/
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

    
        it('Contraseña no valida', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            /*Contraseña no valida: 000*/
            cliente.telefono = generarTelefono()
            cliente.password = '000'
            cliente.confirmarPassword = cliente.password
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.log('Validando Contraseña incorrecta')
            cy.get('p').contains('La contraseña debe tener al menos 6 caracteres')
            .should('be.visible')
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

        it('Largo máximo del campo Dirección_FALLA', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            cliente.CUIT = generarCUIT()
            cliente.telefono = generarTelefono()
            cliente.email = generarEmail()
            cliente.confirmarEmail = cliente.email
            cliente.direccion = "esta es una direccion muy larga para validar que el campo no permita ingresar una direccion con mas de 250 caracteres"
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.log('Validando Largo no permitido')
            cy.get('p').contains('largo no permitido')
            .should('be.visible')
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })
})