import { generarDNI, generarEmail, generarTelefono, generarCUIT } from '../utils/generators'


describe('Casos negativos', () => {
    beforeEach(() => {
        cy.visit('/auth/registerClient') //viene del base url configurado en cypress.config.js
    });
    it('2- Correo invalido', () => {
        cy.fixture('register.ok.json').then((cliente) => {
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

        it('3-Campos vacios (parte 1)', () => {
        cy.fixture('register.bad_vacios1.json').then((cliente) => {
            /*Campos vacios: razon social - cuit - provincia y localidad*/
            cliente.telefono = generarTelefono()
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()

            cy.log('Validando Razon Social')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')

            cy.log('Validando CUIT')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')

            cy.log('Validando Provincia')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')

            cy.log('Validando Localidad')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

    it('4-Campos vacios (parte 2)', () => {
        cy.fixture('register.bad_vacios2.json').then((cliente) => {
            /*Campos vacios: direccion, telefono, emai, contraseña*/
            cliente.telefono = generarTelefono()
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.log('Validando Direccion')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            cy.log('Validando telefono')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            cy.log('Validando Email')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            cy.log('Validando Contraseña')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

        it('5-Campos vacios (parte 3)', () => {
        cy.fixture('register.bad_vacios3.json').then((cliente) => {
            /*Campos vacios: confirmarEmail - confirmarContraseña*/
            cliente.telefono = generarTelefono()
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.log('Validando Confirmar Email')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            cy.log('Validando Confirmar contraseña')
            cy.get('div[data-slot="error-message"]') 
            .should('contain.text', 'Completa este campo')
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

        it('6-Contraseña no valida', () => {
        cy.fixture('register.ok').then((cliente) => {
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

        it('7-Largo máximo del campo Dirección', () => {
        cy.fixture('register.ok').then((cliente) => {
            /*Campos vacios: confirmarEmail - confirmarContraseña*/
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