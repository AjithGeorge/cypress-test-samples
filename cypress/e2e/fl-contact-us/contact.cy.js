describe('FounderAndLighting-ContactUS', () => {
    beforeEach(() => {
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

        it('displays re-captcha div', () => {
            cy.get('iframe[title="reCAPTCHA"]')
        })

        it('displays header-navbar and components', () => {
            cy.get('#navbarNavDropdown').children().first().children().should('have.length', 8)
        })

        it('displays footer with details', () => {
            cy.get('.footer-content').contains('hello@founderandlightning.com')
            cy.get('.footer-content').contains('talent@founderandlightning.com ')
            cy.get('.footer-content').contains('Find us on social media.')

        })

    })

    context('contact form', () => {
        const firstname = 'John'
        const lastname = 'doe'
        const email = "johndoe@domain.com"
        const phone = "+123-456789"
        const selection = 'Other'
        const message = "Sample Message for the contact form"

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
            cy.get('input[name=firstname]').type(firstname)
            cy.get('input[name=lastname]').type(lastname)
            cy.get('input[name=email]').type(email)
            cy.get('input[name=mobilephone]').type(phone)
            cy.get('textarea[name=message]').type(message)
            cy.get('select[name=how_did_you_hear_about_us_]').select(selection)

            cy.get('input[name=firstname]').should('have.value', firstname)
            cy.get('input[name=lastname]').should('have.value', lastname)
            cy.get('input[name=email]').should('have.value', email)
            cy.get('input[name=mobilephone]').should('have.value', phone)
            cy.get('textarea[name=message]').should('have.value', message)
            cy.get('select[name=how_did_you_hear_about_us_]').should('have.value', selection)
        })

        it('displays warning for form fields when input is not provided', () => {
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
            cy.get('input[name=firstname]').type(firstname)
            cy.get('input[name=lastname]').type(lastname)
            cy.get('input[name=email]').type(email)
            cy.get('input[name=mobilephone]').type(phone)
            cy.get('textarea[name=message]').type(message)
            cy.get('select[name=how_did_you_hear_about_us_]').select(selection)
            cy.contains('Send Message >').click()
            cy.contains('Failed to validate Captcha. Please try again.')

        })

        context('input data validations', () => {
            it.only('displays warning for invalid email', () => {
                const invalidEmails = ['123.com', "hello", "123@!@#.com","hey@com@domain"]
                for (let email of invalidEmails) {
                    cy.get('input[name=email]').clear()
                    cy.get('input[name=email]').type(email)
                    cy.contains('Email must be formatted correctly.')
                }
            })

            it.only('displays warning for invalid phone number', () => {
                const invalidPhone = ['qwer123', "!@#456", "PO#-)(*123"]
                for (let phone of invalidPhone) {
                    cy.get('input[name=mobilephone]').clear()
                    cy.get('input[name=mobilephone]').type(email)
                    cy.contains('Must contain only numbers, +()-. and x.')
                }
            })
        })

    })

})
