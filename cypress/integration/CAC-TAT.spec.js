// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
//diretorio com as aulas: https://github.com/wlsf82/cypress-basico-v2/tree/main

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {

        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .click()
            .type("Igor")

        cy.get('#lastName')
            .click()
            .type("Bastos")
            
        cy.get('#email')
            .click()
            .type("igor.bastos@teste.com")

        cy.get('#open-text-area').click().type("Este é apenas um teste",{delay:0})    

        cy.get('.button').click()

        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        
        cy.get('#firstName')
            .click()
            .type("Igor")

        cy.get('#lastName')
            .click()
            .type("Bastos")
            
        cy.get('#email')
            .click()
            .type("emailinvalido.com")

        cy.get('#open-text-area').click().type("Este é apenas um teste",{delay:0})    


        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche campo telefone com valor não numerico', function() {
        cy.get('#phone').click().type('teste')
        cy.get('#phone').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
         cy.get('#firstName')
            .click()
            .type("Igor")

        cy.get('#lastName')
            .click()
            .type("Bastos")
            
        cy.get('#email')
            .click()
            .type("igor.bastos@teste.com")

        cy.get('#open-text-area').click().type("Este é apenas um teste",{delay:0})    

        cy.get('#phone-checkbox').click()

        cy.get('.button').click()

        cy.get('.error').should('be.visible')  
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
         cy.get('#firstName')
            .click()
            .type("Igor")
        cy.get('#firstName').clear().should('have.value', '')

        cy.get('#lastName')
            .click()
            .type("Bastos")
        cy.get('#lastName').clear()
            
        cy.get('#email')
            .click()
            .type("igor.bastos@teste.com")
        cy.get('#email').clear().should('have.value', '')

        cy.get('#phone')
            .click()
            .type('8499999999')
        cy.get('#phone').clear().should('have.value', '')

        cy.get('#open-text-area')
            .click()
            .type("Este é apenas um teste",{delay:0})  
        cy.get('#open-text-area').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        
        cy.get('.button').click()

        cy.get('.error').should('be.visible')  
    })
})  