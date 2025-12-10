Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type("Igor")

        cy.get('#lastName').type("Bastos")
            
        cy.get('#email').type("igor.bastos@teste.com")

        cy.get('#open-text-area').type("Este é apenas um teste",{delay:0})    

        cy.get('.button').click()
})