describe('test-registro.cy.js', () => {
  it('Testing de registro',()=>{
    cy.visit('/')
    
    indexedDB.deleteDatabase('mydb')
    cy.log("indexedDB.deleteDatabase('mydb')")

    cy.url().should('include', '/login-alumno')

    cy.get('.btn-registrarse').last().click()
    cy.url().should('include', '/registro')
    cy.get('[formControlName ="nombre"]').type('Francisco')
    cy.get('#input-email').type('fra@alumno.cl')
    cy.get('#pass').type('12345678')
    cy.get('[formControlName ="repass"]').type('12345678')

    cy.get('#enviar').click()

    cy.url().should('include', '/login-alumno')


    cy.get('.bg-change-version').click()
    cy.url().should('include', '/login-docente')

    cy.get('.btn-registrarse').last().click()
    cy.url().should('include', '/registro')
    cy.get('[formControlName ="nombre"]').type('Alfredo')
    cy.get('#input-email').type('alfr@docente.cl')
    cy.get('#pass').type('123456789')
    cy.get('[formControlName ="repass"]').type('123456789')

    cy.get('#enviar').click()

    cy.url().should('include', '/login-docente')

  })
})
