import {Browser, BrowserContext, Page} from "@playwright/test"

const {setWorldConstructor} = require("@cucumber/cucumber")


export class CustomWorld {

    context: BrowserContext
    page: Page

    /**
     * Session variables that can be used to pass values between different steps.
     * You can see an example being used in a test with the 'SELECTED_PRODUCT' variable.
     * */

    SELECTED_PRODUCT: string
}

setWorldConstructor(CustomWorld)

