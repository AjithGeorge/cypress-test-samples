describe('doqit-sample', {testIsolation: false}, () => {
    before(() => {
        Cypress.session.clearCurrentSessionData()
        cy.visit('http://doqit-react-uat.herokuapp.com')
    })
    context('landing page', () => {
        it('has the welocme text', () => {
            cy.contains('Reduce the time, unnecessary spend and stress of your life admin.')
        })
        it('can login', () => {
            cy.contains('LOG IN').click()
            cy.contains("Don't have an account?SIGN UP").should('exist')
        })
        it('can input user details', () => {
            cy.get('#email').type("ajith@yopmail.com")
            cy.get('#password').type("Test@12341234")
            cy.get('[data-cy=submit-btn]').click()
        })
    })
    context('user page', () => {
        it(' shows the welcome message', () => {
            cy.contains('Hi, Ajith!').should('exist')
        })

        it('can add new document', () => {
            cy.get('[data-cy=add-doc]').click()
        })

        it('can add bank document', () => {
            cy.get('[data-cy=list-of-category]').first().click()
            cy.get('[data-cy="submit-btn"]').click()

        })
    })
    context('add docu details', () => {
        it('can enter details', () => {
            cy.get('input[id=name]').type('test document')
        })
        it('can submit', () => {
            cy.get('[data-cy="submit-btn"]').click()
        })
        it('can input details for renewal', () => {
            cy.get(".react-datepicker-wrapper").click()
            cy.get('*[class^="react-datepicker"]').find('[aria-disabled="false"]').first().click()
            cy.get('#before').type(10)
            cy.contains('CONTINUE').click()
        })
        it('can skip add file', () => {
            cy.get('[data-cy="cta-skip"]').click()
        })
    })
})

