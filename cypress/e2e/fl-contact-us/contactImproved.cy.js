describe('FounderAndLighting-ContactUS', {testIsolation: false}, () => {
    before(() => {
        Cypress.session.clearCurrentSessionData()
        cy.visit('/contact')
        cy.get('#hs-eu-confirmation-button').click()

    })

    context('landing page', () => {
        it('displays right title', () => {
            cy.title().should('include', 'Reach out to Founder and Lightning today');
        })

        it('displays heading \'contact us\'', () => {
            cy.get('.display-4').should('contain.text', 'Contact');
        })

        it('displays welcome message', () => {
            cy.get('.m-0').should('contain.text', 'Whether you’re a would-be founder, our next superstar looking for a future role, or an investor interested in our model, we’d love to meet you.');
        })

        it('displays header-navbar and components', () => {
            cy.get('#navbarNavDropdown').children().first().children().should('have.length', 8)
        })

        it('displays footer with details', () => {
            cy.get('.footer-content').contains('hello@founderandlightning.com')
            cy.get('.footer-content').contains('talent@founderandlightning.com ')
            cy.get('.footer-content').contains('Find us on social media.')

        })

        it('has working nav links', () => {
            cy.get("#navbarNavDropdown").find(".nav-link").each(($el) => {
                cy.wrap($el).scrollIntoView()
                    .should("not.have.attr", "href", "#undefined")
            })
        })

        it('displays re-captcha div', () => {
            cy.get('iframe[title="reCAPTCHA"]')
        })

    })

    context('contact form', () => {
        let user
        before(() => {
            cy.fixture('testdata').then((testdata) => {
                user = testdata.user
            })
        })

        beforeEach(() => {
            cy.visit('/contact')
        })

        it('displays form fields', () => {
            cy.get('input[name=firstname]').should('have.value', "")
            cy.get('input[name=lastname]').should('have.value', "")
            cy.get('input[name=email]').should('have.value', "")
            cy.get('input[name=mobilephone]').should('have.value', "")
            cy.get('textarea[name=message]').should('have.value', "")
            cy.get('select[name=how_did_you_hear_about_us_]').children().should('have.length', 12)
            const dropdownItems = ['Referral', 'Word of mouth', 'LinkedIn', 'Other', 'Job board']; //More can be added.
            for (let item of dropdownItems) {
                cy.get('select[name=how_did_you_hear_about_us_]').children().contains(item)
            }
        })

        it('can input details into form fields', () => {
            cy.get('input[name=firstname]').type(user.firstname)
            cy.get('input[name=lastname]').type(user.lastname)
            cy.get('input[name=email]').type(user.email)
            cy.get('input[name=mobilephone]').type(user.phone)
            cy.get('textarea[name=message]').type(user.message)
            cy.get('select[name=how_did_you_hear_about_us_]').select(user.selection)

            cy.get('input[name=firstname]').should('have.value', user.firstname)
            cy.get('input[name=lastname]').should('have.value', user.lastname)
            cy.get('input[name=email]').should('have.value', user.email)
            cy.get('input[name=mobilephone]').should('have.value', user.phone)
            cy.get('textarea[name=message]').should('have.value', user.message)
            cy.get('select[name=how_did_you_hear_about_us_]').should('have.value', user.selection)
        })

        it('displays warning if fields are left blank', () => {
            let count = 0;
            cy.get('input[required=""]').each(($el) => {
                cy.wrap($el).click()
                cy.get('.hs-main-font-element').should('have.length', count)
                count++
            })
            cy.get('textarea[name=message]').click()
            cy.get('.m-0').click()
            cy.get('.hs-main-font-element').each(($el) => {
                cy.wrap($el).should('have.text', 'Please complete this required field.')
            })
            cy.get('.hs-main-font-element').should('have.length', 5)

        })

        it('displays warning for submit without required form fields', () => {
            cy.contains('Send Message >').click()
            cy.get('.hs-main-font-element').last().should('have.text', 'Please complete all required fields.')
        })

        it('cannot submit without captcha', () => {
            cy.get('input[name=firstname]').type(user.firstname)
            cy.get('input[name=lastname]').type(user.lastname)
            cy.get('input[name=email]').type(user.email)
            cy.get('input[name=mobilephone]').type(user.phone)
            cy.get('textarea[name=message]').type(user.message)
            cy.get('select[name=how_did_you_hear_about_us_]').select(user.selection)
            cy.contains('Send Message >').click()
            cy.contains('Failed to validate Captcha. Please try again.')

        })

        context('input data validations', () => {
            it('displays validation for invalid email', () => {
                const invalidEmails = ['123.com', "hello", "123@!@#.com", "hey@com@domain"]
                for (let email of invalidEmails) {
                    cy.get('input[name=email]').clear()
                    cy.get('input[name=email]').type(email)
                    cy.contains('Email must be formatted correctly.')
                }
            })

            it('displays validation for invalid phone number', () => {
                const invalidPhone = ['qwer123', "!@#456", "PO#-)(*123"]
                for (let phone of invalidPhone) {
                    cy.get('input[name=mobilephone]').clear()
                    cy.get('input[name=mobilephone]').type(phone)
                    cy.contains('Must contain only numbers, +()-. and x.')
                }
            })
        })

    })

    context('session and cookies', () => {
        before(() => {
            Cypress.session.clearCurrentSessionData()
            cy.visit('/contact')
        })
        it('asks for cookies preference', () => {
            cy.contains('This website uses cookies')
            cy.get('#hs-eu-confirmation-button').should('exist')
            cy.get('#hs-eu-decline-button').should('exist')
        })
        it('can decline cookies', () => {
            cy.get('#hs-eu-decline-button').click()

        })
    })

})