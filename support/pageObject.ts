import {Config, Locator, Page} from '@playwright/test'

export default class PageObject {

    page: Page

    constructor(page: Page) {
        this.page =  page
    }

    async navigate (path) {
        await this.page.goto(path)
    }

}