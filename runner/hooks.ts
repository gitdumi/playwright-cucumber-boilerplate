import {After, Before, BeforeAll, Status} from "@cucumber/cucumber";
import {chromium, firefox, webkit} from "@playwright/test";


const qaConfig = require('../support/config/qa.json');
const liveConfig = require('../support/config/live.json');

const env = process.env.environment
const browser = process.env.browser
const debug = process.env.debug
const headless = process.env.headless

BeforeAll(async function () {
    switch (env) {
        case 'qa':
            global.env = qaConfig
            break
        case 'live':
            global.env = liveConfig
            break
        default:
            throw new Error('Environment ' + env + ' undefined in runner/hooks.ts')
    }

    console.log('=====================================================================================')
    console.log('==| Running tests on environment: ' + env.toUpperCase() + ' and browser: ' + (browser != undefined ? browser : global.env.browser).toUpperCase())
    console.log('=====================================================================================\n')

    switch (browser != undefined ? browser : global.env.browser) {
        case 'chrome':
            global.browser = await chromium.launch({
                headless: headless != undefined ? Boolean(headless) : global.env.headless,
                logger: {
                    isEnabled: (name, severity) => debug != undefined ? debug : global.env.debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        case 'firefox':
            global.browser = await firefox.launch({
                headless: headless != undefined ? Boolean(headless) : global.env.headless,
                logger: {
                    isEnabled: (name, severity) => global.env.debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        case 'safari':
            global.browser = await webkit.launch({
                headless: headless != undefined ? Boolean(headless) : global.env.headless,
                logger: {
                    isEnabled: (name, severity) => global.env.debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        default:
            throw new Error(global.env.browser + ' browser not defined in runner/hooks.ts')
    }


})

Before(async function (scenario) {
    console.log('------| Starting scenario: ' + scenario.pickle?.name)
    global.context = await global.browser.newContext()
    global.page = await global.context.newPage()
})

After(async function (scenario) {
    console.log('------| Ending scenario: ' + scenario.pickle?.name + ' === Status: ' + scenario.result?.status)
    if (scenario.result?.status != Status.PASSED && global.env.screenshots ? global.env.screenshots : false) {
        await global.page.screenshot({path: 'playwright-report/screenshots/' + Date.now().toString() + '.png'});
    }
})