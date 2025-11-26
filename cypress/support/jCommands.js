import 'cypress-file-upload';

Cypress.Commands.add('createUniqueEvent',()=>{
    cy.wait(1000)
    cy.intercept('POST', '//api/backend/events/create-event').as('eventCreated')
    cy.visit('/newEvent') //viene del base url configurado en cypress.config.js    
        cy.fixture('loadEvent.json').then((data)=>{
         const ev1 = data.evÚnico
           cy.log('Cargando evento con datos válidos')
            cy.get('[data-cy="input-titulo"]').type(ev1.título)
            cy.get('[data-type="day"]').type(ev1.fecha.day)
            cy.get('[data-type="month"]').type(ev1.fecha.month)
            cy.get('[data-type="year"]').type(ev1.fecha.year)
            cy.get('div > span').contains('Seleccionar edad').click()
            cy.get('ul > li > span').contains(ev1.edad).click()
            cy.get('div > span').contains('Seleccionar genero').click()
            cy.get('ul > li > span').contains(ev1.genero).click()
            cy.get('[data-cy="input-horario"] > [data-type="hour"]').type(`${ev1.horario}`)
            cy.get('[data-cy="input-duracion"] > [data-type="hour"]').type(`${ev1.duraciónDelEvento}`)
            cy.get('div > button').contains('Lugar del Evento').click({force: true}).and
            cy.get('ul > li > span').contains(ev1.lugarDelEvento).click()
            cy.get('[data-cy="input-nombre-lugar"]').type(ev1.nombreLugar)
            cy.get('[data-cy="input-calle-lugar"]').type(ev1.calle)
            cy.get('[data-cy="input-altura-lugar"]').type(ev1.altura)
            cy.get('[data-cy="input-codigo-postal-lugar"]').type(ev1.cp)
            cy.get('div > [placeholder="Seleccione una provincia"]').type(ev1.provincia)
            cy.get('ul > li > span').contains(ev1.provincia).click()
            cy.get('div > [placeholder="Seleccione una localidad"]').type(ev1.localidad)
            cy.get('ul > li > span').contains(ev1.localidad).click()    
            cy.get('[data-cy="input-info"]').type(ev1.info)
     
            cy.get('div > button').contains('Siguiente').click()

            cy.get('div > span').contains('Seleccionar entrada').click()
            cy.get('ul > li > span').contains(ev1.entrada).click()
            cy.get('[aria-label="Capacidad"]').type(ev1.capacidad)
            cy.get('[aria-label="Precio Entrada"]').type(ev1.precio)

            cy.get('div > button').contains('Siguiente').click()

            cy.get('div > button').contains('Cargar Imagen Evento').click()
            cy.get('input[type="file"]').attachFile('images/eventoTest.jpg')
            cy.wait(5000) //espera para que desaparezca un popup que tapa el botón siguiente
            cy.get('div > button').contains('Siguiente').click({force: true})

            cy.get('div > button').contains('Confirmar').click({force: true})
            
            cy.wait('@eventCreated').then((interception) => {
              expect(interception.response.statusCode).to.eq(201)
            })
            cy.get('div').contains('Evento creado con éxito').should('be.visible')
            
            cy.url().should('eq', 'https://ticketazo.com.ar/')

        })


})  