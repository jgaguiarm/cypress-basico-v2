/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    let firstName = "user";
    let lastName = "teste";
    let email = "user.teste@testeuser.com";
    let telefone = 859998541731

    this.beforeEach(function(){
        cy.visit('src/index.html')
        
    })
    it('verifica o título da aplicação', function() {      
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')  
    })
    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste,testando,testado,Teste,testando,testado,Teste,testando,testado,Teste,testando,testado,Teste,testando,testado';
        cy.get('#firstName').type('User')
        cy.get('#lastName').type('20231121')
        cy.get('#email').type('user20231121@teste.com')
        cy.get('#open-text-area').type(longText,{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')

    })
    it('Exibe mensagem de erro ao submeter o fomrulário com um e-mail com formatação inválida',function(){
        cy.get('#firstName').type('User')
        cy.get('#lastName').type('20231121')
        cy.get('#email').type('user20231121.teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Validar que o campo de telefone continua vazio quando preenchido com caractere de não-numérico',function(){
        cy.get('#phone').type('teste')
          .type('abcdefghij')
          .should('have.value','')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', function(){
        cy.get('#phone-checkbox').check()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
          .type(firstName)
          .should('have.value',firstName)
          .clear()
          .should('have.value', '')
          cy.get('#lastName')
          .type(lastName)
          .should('have.value',lastName)
          .clear()
          .should('have.value', '')
          cy.get('#email')
          .type(email)
          .should('have.value',email)
          .clear()
          .should('have.value', '')
          cy.get('#phone')
          .type(telefone)
          .should('have.value',telefone)
          .clear()
          .should('have.value', '')
    })
    it('exibe a mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia um formulario com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
          .get('.success')
          .should('be.visible')
    })
    it('seleciona um produto (Youtube) por seu valor (value)', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select('Mentoria')
          .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu valor (value)', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
          .should('have.value', 'feedback')        
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })
    it('marca e desmarca ckeckboxes',function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            console.log($input[0])
          })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json',{ action: 'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('seleciona um arquivo utilizando fixture para a qual foi dada um alias',function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){  
        expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de click',function(){
      cy.get('#privacy a').should('have.attr','target', '_blank')
    })   
    it('acessa a pagina de política de privacidade de forma independete',function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing')
        .should('be.visible')

    })

  })
  