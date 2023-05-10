# Cypress UI Test Project

This is a sample project that demonstrates how to use Cypress to write UI tests for a web application.
## Installation

To install this project, clone the repository from GitHub:

`git clone https://github.com/AjithGeorge/cypress-test-samples.git`

Then, navigate to the project directory and install the dependencies using npm:

`npm install`

All the dependencies are listed in the package.json file.

## Prerequisites:

1. Cypress Installed (For running from Cypress GUI).
2. Node and Npm installed. (for CLI execution or CI/CD integration)

## Usage

To start the application,

`cypress run`

More command options available at [Cypress CLI](https://docs.cypress.io/guides/guides/command-line)

This should start the execution of the test scripts.

## Overview:

The solution has, tests and scenarios for the https://www.founderandlightning.com/contact page

    
    Scenario: Verifying the Landing Page
    Test cases:
        Verify page title
        Verify page heading
        Verify welcome message displayed
        Verify re-captcha is enabled in the page
        Verify header and footer available for the page
        Verify nav links are working


    Scenario: Verify the contact form
    Test cases:
        Verify that all the form fields are available and doesn't have values by default.
        Verify that values can be input for the different fields
        Verify that warning messages are displayed for left out required fields
        Verify that submit throws error if unresolved warnings are present.
        Verify that submit require captcha validation
    Note: The test is set till the point of captcha validation.(Bypass Not Implemented) Test is supposed to fail on CLI execution.

    Scenario: Form input validations
    Test cases:
        Verify that email accepts only valid inputs
        Verify that phone number accepts only valid inputs


## Explanation:
All the test code is available in the `/e2e/fl-contact-us/contact.cy.js` file. 

Project is configured with an html reporter -[cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter).
If the cli command is used with the reporter tag then the report and associated files will be generated automatically.

Example: `cypress run --reporter cypress-mochawesome-reporter`

A sample report is also attached for reference.(Report is available inside cypress/reports)