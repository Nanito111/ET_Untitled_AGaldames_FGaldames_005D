describe('test-qrGen.cy.js', () => {
  it('Prueba de generar QR', () => {
    cy.visit('/')

    cy.get('.bg-change-version').click()
    cy.url().should('include', '/login-docente')

    cy.get('[formControlName="correo"]').last().type('alfr@docente.cl')
    cy.get('[formControlName="password"]').last().type('123456789')

    cy.get('.boton-login').last().click()
    cy.url().should('include', '/home')

    cy.get('#qr').click()

    cy.get('.input-seccion').type('TestingEv3')
    cy.get('.input-fecha').type('2022-11-24')
    cy.get('.input-Hinicio').type('12:40')
    cy.get('.input-HTermino').type('13:00')

    cy.get('#open-modal2').click()



  })
})
















    

