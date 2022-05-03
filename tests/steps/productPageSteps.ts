import {ProductPage} from '../pages/productPage'
import {CustomWorld} from "../../support/customWorld";


const {Given, When, Then} = require("@cucumber/cucumber")


Then("the user finds that the product page is loaded correctly", async function (this: CustomWorld) {
    const productPage = new ProductPage()
    await productPage.assertUrl()
    await productPage.assertProductTitle(this.SELECTED_PRODUCT)
})