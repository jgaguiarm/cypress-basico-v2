Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('User')
    cy.get('#lastName').type('20231121')
    cy.get('#email').type('user20231121@teste.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button','Enviar').click()
})