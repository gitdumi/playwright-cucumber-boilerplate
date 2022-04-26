import {After, Before, BeforeAll, Status} from "@cucumber/cucumber";
import {chromium, firefox} from "@playwright/test";


const qaEnvConfig = require('../support/config/qa.json');


BeforeAll(async function () {
    global.env = qaEnvConfig

    global.browser = await chromium.launch({
        headless: false,
        logger: {
            isEnabled: (name, severity) => global.env.debug,
            log: (name, severity, message, args) => console.log(`${severity} ${name} ${message}`),
        }
    });
})

Before(async function (scenario) {
    console.log('------| Starting scenario: ' + scenario.pickle?.name)
    global.context = await global.browser.newContext()
    global.page = await global.context.newPage()
})

After(async function (scenario) {
    console.log('------| Ending scenario: ' + scenario.pickle?.name)
    if (scenario.result?.status === Status.FAILED) {
        await global.page.screenshot({path: 'playwright-report/screenshots/' + Date.now().toString() + '.png'});
    }
})