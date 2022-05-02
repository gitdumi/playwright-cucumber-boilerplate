const report = require("multiple-cucumber-html-reporter");
const fs = require("fs-extra")


const env = process.argv.slice(2)[0]
const browser = process.argv.slice(3)[0]

const env2 = process.env.environment
const debug = process.env.debug


const getOs = () => {
    const platform = process.platform
    switch (platform) {
        case 'darwin':
            return 'osx'
        default:
            return platform
    }
}

const path = 'results/cucumber-report.json'

fs.readFile(path, (err) => {
    if (err) {
        throw err;
    }

    try {
        report.generate({
            jsonDir: "results",
            reportPath: "results/cucumber-report-html",
            metadata: {
                browser: {
                    name: `${browser}`,
                    version: `${browser}`
                },
                device: 'Playwright',
                platform: {
                    name: getOs()
                }
            },
            customData: {
                title: 'Run info',
                data: [
                    {label: 'Project', value: 'SauceLabs Web - ' + env.toString().toUpperCase()},
                ]
            }
        })
    } catch (error) {
        console.log(error)
        console.log('====================================================================================================')
        console.log('Could not generate test report')
        console.log('====================================================================================================')
    }
})