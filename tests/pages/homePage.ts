import PageObject from "../../support/pageObject";
import {expect, Locator} from "@playwright/test";
import {CustomWorld} from "../../support/customWorld";

export class HomePage extends PageObject {

    private urlPattern = '/inventory.html$'
    private pageTitle = this.page.locator('#header_container .title')
    private productLinks = this.page.locator('.inventory_item_name')


    async assertUrl() {
        await expect(this.page.url().match(this.urlPattern))
    }

    async waitForPageLoad() {
        await expect(await this.pageTitle.textContent()).toContain('Products')
    }

    private async getProductLinks() {
        return this.productLinks;
    }

    async selectRandomProduct(world: CustomWorld) {
        const links = await this.getProductLinks()
        const index = Math.floor(Math.random() * await links.count())
        world.SELECTED_PRODUCT = await links.nth(index).textContent()
        await links.nth(index).click()
        console.log('Selected product: ' + world.SELECTED_PRODUCT)
    }
}