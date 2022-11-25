describe('test-login.cy.js', () => {
  it('Testing Login', () => {
    cy.visit('/')

    cy.get('[formControlName="correo"]').type('fra@alumno.cl')
    cy.get('[formControlName="password"]').type('12345678')

    cy.get('.boton-login').click()
    
    cy.url().should('include', '/home')
    
    cy.get('#menu-button').click()

    cy.wait(500)

    cy.get('#logout-button').click()

    cy.url().should('include', '/login-alumno')

    cy.get('.bg-change-version').click()
    cy.url().should('include', '/login-docente')

    cy.get('[formControlName="correo"]').last().type('alfr@docente.cl')
    cy.get('[formControlName="password"]').last().type('123456789')

    cy.get('.boton-login').last().click()
    cy.url().should('include', '/home')

    cy.get('#menu-button').click()
    
    cy.wait(500)

    cy.get('#logout-button').click()

    
  })
})