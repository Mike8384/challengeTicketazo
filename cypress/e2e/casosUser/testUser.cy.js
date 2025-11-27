

describe('Registro', ()=>{

    beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser') 
    })
    it('Completa todos los campos y presiona Registrar', ()=>{
        cy.fixture('dataUser').then((data) => {
            cy.pruebaHappy(data.pruebaHappyUser)
        })

    })
})