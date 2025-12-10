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

        cy.get('#open-text-area').click().type("Este é apenas um teste", { delay: 0 })

        cy.get('.button').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName')
            .click()
            .type("Igor")

        cy.get('#lastName')
            .click()
            .type("Bastos")

        cy.get('#email')
            .click()
            .type("emailinvalido.com")

        cy.get('#open-text-area').click().type("Este é apenas um teste", { delay: 0 })


        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche campo telefone com valor não numerico', function () {

        cy.get('#phone').click().type('teste')
        cy.get('#phone').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .click()
            .type("Igor")

        cy.get('#lastName')
            .click()
            .type("Bastos")

        cy.get('#email')
            .click()
            .type("igor.bastos@teste.com")

        cy.get('#open-text-area').click().type("Este é apenas um teste", { delay: 0 })

        cy.get('#phone-checkbox').check()

        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
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
            .type("Este é apenas um teste", { delay: 0 })
        cy.get('#open-text-area').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //comandos costumizados para evitar duplicidade de código -> comando costumizados(preferencial e evita duplicacao de codigo) vs page objects
    it('Evia formualrio com sucesso usando comandosocutmizados', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })

    //uso do .contains() -> seletor,texto especifico 
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //uso de select options de forma aleatoria 
    it('Selecionar uma opção de forma aleatoria', () => {

        cy.get('select#product option')
            .not('[disabled]')
            .as('options')
            .its('length', { log: false }).then(n => {
                cy.get('@options', { log: false }).then($options => {
                    const randomOptionIndex = Cypress._.random(n - 1)
                    const randomOptionText = $options[randomOptionIndex].innerText
                    cy.get('select').select(randomOptionText)
                })
            })
    })
    // da certo ser no get a chamada pelo elemento select ou pelo id  dos products
    it('seleciona produto (seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    })

    // inputs tipo radio ou checkbox -por questões semanticas da certo o .check mas tbm funciona .click
    it('Selecionna button radio', () => {
        cy.get('input[type="radio"]')
            .check()

    })

    // o check() aceita um valor
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"] ')
            .check('feedback')
            .should('have.value', 'feedback')

    })

    it('marca o tipo de atendimento "Feedback" e checar', () => {
        cy.get('input[type="radio"][value="feedback"] ')
            .check()
            .should('have.value', 'feedback')
            .should('be.checked')
    })

    //selecionar varios checks e testar um a um
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    //ESSA FORMA NÃO É PERFORMÁTICA

    // agora vamos ver os checkbox 
    // it('marca ambos checkboxes, depois desmarca o último', ()=>{
    //     cy.get('input[type="checkbox"]')
    //         .each(function($checkbox){
    //             //lemprar de utilizar o wrap como forma de lidar com o objeto - o get espera uma string
    //             cy.wrap($checkbox).check().should('be.checked')

    //         })
    // })

    //FORMA CORRETA
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('#check input[type="checkbox"]')
            .check()
            .should('be.checked')

        cy.get('input[type="checkbox"]')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    //Seção 7: Fazendo upload de arquivos com Cypress
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should("not.have.value")
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should("not.have.value")
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //simplificar a forma de passar o arquivo e dar um alias a ela e n preciasr passar o caminho todo
    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { enconding: null }).as('exampleFile')

        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

})  