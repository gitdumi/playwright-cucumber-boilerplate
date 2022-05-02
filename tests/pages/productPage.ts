import PageObject from "../../support/pageObject";
import {expect} from "@playwright/test";

export class ProductPage extends PageObject {

    private urlPattern = '/inventory-item.html?id=[0-9]+'
    private productNameFromTitle = '.inventory_details_name'

    async navigate(productId: number) {
        await this.page.goto('/inventory-item.html?id=' + productId)
        await this.assertUrl()
    }

    async assertUrl() {
        expect(await this.page.url().match(this.urlPattern))
    }

    async assertProductTitle(expectedTitle: string) {
        await expect(this.page.locator(this.productNameFromTitle), 'should be logged in').toBeVisible();
        await expect(this.page.locator(`css=${this.productNameFromTitle} >> text=${expectedTitle}`)).toBeVisible()
    }
}

