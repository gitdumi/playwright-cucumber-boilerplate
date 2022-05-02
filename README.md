# BDD Automated Testing Framework using Playwright and Cucumber

E2E Test Automation framework using Playwright, Typescript, Cucumber

[Playwright documentation](https://playwright.dev/docs/intro)

## Setup

1. Install npm and node.js

2. Install project dependencies using:
```
$ npm install
```

## Configuration

Config .json files found in the ./support/config directory for two environments: QA and LIVE.

Example:
```
{
  "browser": "chrome",
  "windowSize": "393x851",
  "headless": true,
  "debug": true,
  "screenshots": false,
  "baseURL": "https://www.saucedemo.com",
  "users": {
    "standard": {
      "username": "standard_user",
      "password": "secret_sauce"
    },
    "admin": {
      "admin": "admin_user",
      "password": "secret_sauce"
    }
  }
}
```

### Structure:


In the ./tests directory you can find the test files:

- features (.feature file definitions)
####    -TBD keywords (implementations of keywords from the feature files) - TBD
        - steps (.ts files which implement logic from page objects or HTTP requests)
            - pages (page objects storing locators and functions to interact with or make assertions on specific pages)

The ./support directory contains the config files for each environment, test fixtures, constants, the page object class and the [customWorld implementation from Cucumber](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md).

Configuration for Cucumber is found in ./cucumber.json. 

The cucumber-report-generator.ts file is the script that handles generating the html report.

## How to run

Configured scripts are found in the package.json file

Scripts can be run using:
```
$ npm run ${scriptName}
```

### Examples using scripts:

```
$ npm run test:qa:chrome

$ npm run test:qa:chrome:parallel

$ npm run test:qa:safari:responsive
```

### Examples using environment variables for config:
```
$ environment=qa browser=chrome headless=false windowSize=393x851 ./node_modules/.bin/cucumber-js tests/features/**/*.feature
```

Reports are generated in ./results/cucumber-html-report, and screenshots for failed steps are saved in the ./results/screenshots folder.

