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

    
    Scenario: Retrieve a list of all objects
    Test case:
        Send a GET request to https://api.restful-api.dev/objects
        Verify that the response status code is 200 OK
        Verify that the response contains a JSON array of objects
        Verify that each object has the expected properties [Schema Validation] (e.g. "id", "name", "data")
    
    GET /objects/:ids

    Scenario: Retrieve a specific object by ID/IDs
    Test case:
        Send a GET request to https://api.restful-api.dev/objects/:id (replace ":id" with the ID/IDs of an existing object)
        Verify that the response status code is 200 OK
        Verify that the response contains the requested number of json objects (Count should match the requested number of Id/Ids)
        Verify that the response contains only the requested ID/IDs
        Verify that the each object has the expected properties [Schema Validation] (e.g. "id", "name", "data")
Assertions using [Chai Assertion Library](https://www.chaijs.com/api/)

## Explanation:
All the test code is available in the `SampleCollection.json` file. This alone should suffice for running from postman application.

The `runner.js` file is to customize the newman runner and to extend some of its capabilities.

The setup has an html reporting enabled by default [htmlextra], also a retry mechanism(for failed tests) is added, all of which can be configured from the `runner.js` file.

Once the tests are run through the `runner.js` file, the html report will be generated in the newman folder.
By default, the retry for failed test are enabled and the iteration count is set to 3.

Retry Mechanism - If enabled(default), will re trigger a run of the failed tests and will generate a new report(Could be useful when testing with dynamic data).

A sample report is also attached for reference.(Report is available inside /newman)