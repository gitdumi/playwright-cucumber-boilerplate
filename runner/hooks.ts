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
            // @ts-ignore
            global.env = qaConfig
            break
        case 'live':
            // @ts-ignore
            global.env = liveConfig
            break
        default:
            throw new Error('Environment ' + env + ' undefined in runner/hooks.ts')
    }

    console.log('=====================================================================================')
    // @ts-ignore
    console.log('==| Running tests on environment: ' + env.toUpperCase() + ' and browser: ' + (browser != undefined ? browser : global.env.browser).toUpperCase())
    console.log('=====================================================================================\n')

    // @ts-ignore
    switch (browser != undefined ? browser : global.env.browser) {
        case 'chrome':
            // @ts-ignore
            global.browser = await chromium.launch({
                // @ts-ignore
                headless: headless != undefined ? Boolean(headless) : global.env.headless,
                logger: {
                    // @ts-ignore
                    isEnabled: (name, severity) => debug != undefined ? debug : global.env.debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        case 'firefox':
            // @ts-ignore
            global.browser = await firefox.launch({
                // @ts-ignore
                headless: headless != undefined ? Boolean(headless) : global.env.headless,
                logger: {
                    // @ts-ignore
                    isEnabled: (name, severity) => global.env.debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        case 'safari':
            // @ts-ignore
            global.browser = await webkit.launch({
                // @ts-ignore
                headless: headless != undefined ? Boolean(headless) : global.env.headless,
                logger: {
                    // @ts-ignore
                    isEnabled: (name, severity) => global.env.debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        default:
            // @ts-ignore
            throw new Error(global.env.browser + ' browser not defined in runner/hooks.ts')
    }


})

Before(async function (scenario) {
    console.log('------| Starting scenario: ' + scenario.pickle?.name)
    // @ts-ignore
    global.context = await global.browser.newContext()
    global.page = await global.context.newPage()
})

After(async function (scenario) {
    console.log('------| Ending scenario: ' + scenario.pickle?.name + ' === Status: ' + scenario.result?.status)
    // @ts-ignore
    if (scenario.result?.status != Status.PASSED && global.env.screenshots ? global.env.screenshots : false) {
        await global.page.screenshot({path: 'playwright-report/screenshots/' + Date.now().toString() + '.png'});
    }
})