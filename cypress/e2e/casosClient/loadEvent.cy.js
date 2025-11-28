import { generateRandomTitle, getDatePlus7 , generarHorarioAleatorio, generarDuraciónAleatoria, pickRandomImage} from '../../utils/jGenerators'

describe('Cargar evento', () => {
  beforeEach(() => {
    cy.visit('/auth/login') //viene del base url configurado en cypress.config.js
    cy.fixture('registerCteEvent.json').then((data) => {
        const cliente = {...data.loginOk}
        cy.Login(cliente)
        })
    });

it('1.Crear evento único', () => {
    cy.createUniqueEvent() //llamo al commands y fixtures desde jCommands.js y loadEvent.json
})
    
it('2.Cargar evento único "Randomizer"', () => {
    cy.wait(1000)
    cy.intercept('POST', '//api/backend/events/create-event').as('eventCreated')
    cy.visit('/newEvent') //viene del base url configurado en cypress.config.js    

    cy.fixture('loadEvent.json').then((data)=>{
    const ev1 = data.evÚnico
    const { day, month, year } = getDatePlus7();
    const randomTitle = generateRandomTitle(7, 'Eventest')
    const opcionesEdad = ['ATP', '+18'];
    const opciónElegida1 = Cypress._.sample(opcionesEdad);
    const opcionesGenero = ['Recital', 'Teatro', 'StandUp', 'Fiesta', 'Conferencia', 'Deportes', 'Feria', 'Festival', 'Exposición', 'Otro'];
    const opciónElegida2 = Cypress._.sample(opcionesGenero);
    const horarioRandom = generarHorarioAleatorio();
    const duraciónRandom = generarDuraciónAleatoria();
    const opcionesProvinca = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Ciudad Autónoma de Buenos Aires', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',];
    const opciónElegida3 = Cypress._.sample(opcionesProvinca);
    const capacidad1 = Math.floor(Math.random() * ((200 - 50) / 10 + 1)) * 10 + 50; // entre 50 y 200
    const capacidad2 = Math.floor(Math.random() * ((50 - 20) / 10 + 1)) * 10 + 20; // entre 20 y 50
    const precio2 = Math.floor(Math.random() * 9 + 1); // entre 1 y 10
  
cy.log('Cargando evento con datos válidos y algunos aleatorios')
        cy.get('[data-cy="input-titulo"]').type(randomTitle)
        cy.get('[data-type="day"]').type(day)
        cy.get('[data-type="month"]').type(month)
        cy.get('[data-type="year"]').type(year)
        cy.get('div > span').contains('Seleccionar edad').click()
        cy.get('ul > li > span').contains(opciónElegida1).click()
        cy.get('div > span').contains('Seleccionar genero').click()
        cy.get('ul > li > span').contains(opciónElegida2).click()
        cy.get('[data-cy="input-horario"] > [data-type="hour"]').type(`${horarioRandom}`)
        cy.get('[data-cy="input-duracion"] > [data-type="hour"]').type(`${duraciónRandom}`)
        cy.get('div > button').contains('Lugar del Evento').click({force: true}).and
        cy.get('ul > li > span').contains(ev1.lugarDelEvento).click()
        cy.get('[data-cy="input-nombre-lugar"]').type(ev1.nombreLugar)
        cy.get('[data-cy="input-calle-lugar"]').type(ev1.calle)
        cy.get('[data-cy="input-altura-lugar"]').type(ev1.altura)
        cy.get('[data-cy="input-codigo-postal-lugar"]').type(ev1.cp)
        cy.get('div > [placeholder="Seleccione una provincia"]').type(opciónElegida3)
        cy.get('ul > li > span').contains(opciónElegida3).click()
        cy.get('div > [placeholder="Seleccione una localidad"]').click()
        cy.get('li > span').then($spans => {
            const randomIndex = Math.floor(Math.random() * $spans.length);
            cy.wrap($spans.eq(randomIndex)).click()
            });  
        cy.get('[data-cy="input-info"]').type(ev1.info)
     
        cy.get('div > button').contains('Siguiente').click({force: true})

        cy.get('button').contains('Agregar Entrada').click()
        cy.get('div > span').contains('Seleccionar entrada').click()
        cy.get('ul > li > span').then($spans => {
            const entrada1 = Math.floor(Math.random() * $spans.length);
            const $entrada1 =$spans.eq(entrada1).text().trim();
            cy.wrap($spans.eq(entrada1)).click();
        cy.get('div > span').contains('Seleccionar entrada').click()
        cy.get('ul > li > span').then($spans2 => { 
            const $entradasRestantes= $spans2.filter((_, el) => el.innerText.trim() !== entrada1); // filtra la primera opción ya seleccionada .not($entrada1);
            if ($entradasRestantes.length > 0) { 
            cy.wrap($entradasRestantes.eq(Math.floor(Math.random() * $entradasRestantes.length))).click();   
            }
            });
            });
           
        cy.get('div > label').filter((_, el) => el.innerText.trim() === 'Capacidad')
        .eq(0).click({force: true}) // primero que cumple la condición
        .type(capacidad1)
        cy.get('div > label').filter((_, el) => el.innerText.trim() === 'Capacidad')
        .eq(1).click({force: true}) // segundo que cumple la condición
        .type(capacidad2)
        cy.get('div > label').filter((_, el) => el.innerText.trim() === 'Precio Entrada')
        .eq(0).click({force: true}).type(ev1.precio)
        cy.get('div > label').filter((_, el) => el.innerText.trim() === 'Precio Entrada')
        .eq(1).click({force: true}).type(precio2)

        cy.get('div > button').contains('Siguiente').click()

        cy.get('div > button').contains('Cargar Imagen Evento').click()
        cy.get('input[type="file"]').attachFile(`images/${pickRandomImage()}`)
           
        cy.get('div > button').contains('Siguiente').click({force: true})

        cy.get('div > button').contains('Confirmar').click({force: true})
            
        cy.wait('@eventCreated').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)
        })
        cy.get('div').contains('Evento creado con éxito').should('be.visible')
            
        cy.url().should('eq', 'https://ticketazo.com.ar/')      
    })    
})

})