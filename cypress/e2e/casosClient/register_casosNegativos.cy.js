import { generarEmail, generarTelefono, generarCUIT } from '../../utils/generators'
describe('Casos negativos', () => {
    beforeEach(() => {
        cy.visit('/auth/registerClient') //viene del base url configurado en cypress.config.js
    });
    it('2.1Correo invalido', () => {
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

    it('2.2 Contraseña no valida', () => {
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

    it('3.Correo ya registrado', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            cliente.CUIT = generarCUIT()
            cliente.telefono = generarTelefono()
            cliente.email = "empresavero@mailinator.com" 
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            // validar cuit registrado
            cy.get('[data-cy="error-message"]').contains('El usuario con este correo electrónico ya existe').should('be.visible')
        })
    })

    it('4.Validacion campo telefono', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            cliente.CUIT = generarCUIT()
            cliente.telefono = "351" //tel menos de 10 digitos
            cliente.email = generarEmail() 
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            // validar telefono
            cy.get('[data-slot="error-message"]')
            .should('be.visible')
            .invoke('text')
            .should((texto) => {
                expect(texto).to.match(/Please match the requested format|Utiliza un formato que coincida con el solicitado/i)
            })

        })
    })

    it('5.Cuit ya registrado', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            // cuit ya registrado
            cliente.CUIT = "23333030413"
            cliente.telefono = generarTelefono()
            cliente.email = generarEmail()
            cliente.confirmarEmail = cliente.email
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            // validar cuit registrado
            cy.get('p').contains('El usuario con este cuit ya existe')
            .should('be.visible')
        })
    })

    it('6. Campos vacios', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.camposVacios}

            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.validarErrorCampoVacio('Completa este campo') /*todos tienen en mismo mensaje*/
            //validar boton del login
            cy.url().should('include', '/auth/registerClient')
        })
    })

    


    it('7.Largo máximo del campo Dirección_FALLA', () => {
        cy.fixture('registerCteEvent.json').then((data) => {
            const cliente = {...data.ok}
            cliente.CUIT = generarCUIT()
            cliente.telefono = generarTelefono()
            // pongo correo para luego poder ingresar al sistema
            cliente.email = generarEmail()
            cliente.confirmarEmail = cliente.email
            cliente.direccion = "esta es una direccion muy larga para validar que el campo no permita ingresar una direccion con mas de 250 caracteres y para ello se realizará de manera terminante la escritura de una cantidad apoteósica e indescifrable de palabras con el fin último de que se haga realidad este deseo más profundo del corazón"
            
            cy.registroCte(cliente)//llamo al commands
            //BTN registrarse
            cy.get('[data-cy="btn-registrarse"]').click()
            cy.log('Validando Largo no permitido')
            cy.get('p').contains('largo no permitido')
            .should('be.visible')

        })
    })
})