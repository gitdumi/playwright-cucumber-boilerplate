import {BrowserContext, Page} from "@playwright/test"

const {setWorldConstructor} = require("@cucumber/cucumber")


export class CustomWorld {

    context: BrowserContext
    page: Page
    env: any

    /**
     * Session variables
     * */

    SELECTED_PRODUCT: string
}

setWorldConstructor(CustomWorld)

