const report = require("multiple-cucumber-html-reporter");
const fs = require("fs-extra")
const config = require('./support/config/run-config.json')

const path = 'results/cucumber-report.json'
let platform = process.platform === 'darwin' ? 'osx' : process.platform


/**
 * You can edit the data from the Cucumber Multi HTML Test report.
 * More information: {@link https://github.com/wswebcreation/multiple-cucumber-html-reporter/blob/main/README.MD}
 */
fs.readFile(path, (err) => {
    if (err) {
        throw err;
    }

    const body = {
        jsonDir: "results",
        reportPath: "results/cucumber-report-html",
        metadata: {
            browser: {
                name: `${config.browser}`,
                version: `${config.browser} ${config.windowSize}`
            },
            device: 'Playwright',
            platform: {
                name: `${platform}`
            }
        },
        customData: {
            title: 'Run info',
            data: [
                {label: 'Project', value: `SauceLabs Web - ${config.envName.toUpperCase()}`},
            ]
        }
    }

    try {
        report.generate(body)
    } catch (error) {
        console.log(error)
        console.log('====================================================================================================')
        console.log('Could not generate test report')
        console.log('====================================================================================================')
    }
})


