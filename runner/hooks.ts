import {After, Before, BeforeAll, Status} from "@cucumber/cucumber";
import {chromium, firefox, webkit} from "@playwright/test";
import {BROWSERS} from "../support/constants";


const qaConfig = require('../support/config/qa.json');
const liveConfig = require('../support/config/live.json');

let env = process.env.environment
let browser = process.env.browser
let debug = process.env.debug
let headless = process.env.headless
let windowSize = process.env.windowSize

BeforeAll(async function () {
    /**
     * Config files are read from support/config and then
     * assigned to the global variable of the test runner
     */
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
            // @ts-ignore
            env = 'qa'
            // @ts-ignore
            global.env = qaConfig
            console.log('Default environment QA config loaded')
    }

    readProperties()

    console.log('=====================================================================================')
    // @ts-ignore
    console.log(`==| Running tests on environment: ${env.toUpperCase()} and browser: ${browser.toUpperCase()} ${windowSize}`)
    console.log('=====================================================================================\n')

    /**
     * The browser is instantiated according to the configuration
     * settings found in support/config or by passing environment variables
     */
    switch (browser) {
        case BROWSERS.CHROME:
            //@ts-ignore
            global.browser = await chromium.launch({
                //@ts-ignore
                headless: headless,
                logger: {
                    //@ts-ignore
                    isEnabled: (name, severity) => debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        case BROWSERS.FIREFOX:
            //@ts-ignore
            global.browser = await firefox.launch({
                //@ts-ignore
                headless: headless,
                logger: {
                    //@ts-ignore
                    isEnabled: (name, severity) => debug,
                    log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
                }
            })
            break
        case BROWSERS.SAFARI:
            // @ts-ignore
            global.browser = await webkit.launch({
                // @ts-ignore
                headless: headless,
                logger: {
                    // @ts-ignore
                    isEnabled: (name, severity) => debug,
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
    console.log('\n------| Starting scenario: ' + scenario.pickle?.name)
    // @ts-ignore
    global.context = await global.browser.newContext({
        viewport: {
            // @ts-ignore
            width: Number(windowSize.split('x')[0]),
            // @ts-ignore
            height: Number(windowSize.split('x')[1])
        }
    })
    global.page = await global.context.newPage()
})

After(async function (scenario) {
    console.log('------| Ending scenario: ' + scenario.pickle?.name + ' === Status: ' + scenario.result?.status + '\n')
    // @ts-ignore
    if (scenario.result?.status != Status.PASSED && global.env.screenshots ? global.env.screenshots : false) {
        await global.page.screenshot({path: 'playwright-report/screenshots/' + Date.now().toString() + '.png'});
    }
})

function readProperties() {
    /**
     * Environment variable properties override support/config files.
     * See package.json for script examples.
     * If no environment variables are set,
     * then the default settings will be support/config/qa.json
     */
    console.log(debug)
    //@ts-ignore
    browser = browser != undefined ? browser : global.env.browser
    //@ts-ignore
    windowSize = windowSize != undefined ? windowSize : global.env.windowSize
    //@ts-ignore
    headless = headless != undefined ? headless === 'true' : global.env.headless
    //@ts-ignore
    debug = debug != undefined ? debug === 'true' : global.env.debug
    console.log(debug)
}