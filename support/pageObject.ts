import {Config, Locator, Page} from '@playwright/test'

export default class PageObject {

    /**
     * Page object model, to be extended when creating a new page object.
     * Allows access to all browser methods provided by Playwright.
     *
     * Example:
     * this.page.click('#id')
     * this.page.fill('#id', 'mystring')
     */

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate(path) {
        await this.page.goto(path)
    }

}