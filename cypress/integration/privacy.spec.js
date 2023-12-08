it('testa a página da política da privacidade de forma independente', function(){
    cy.visit('/src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
        
})