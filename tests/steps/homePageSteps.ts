import {CustomWorld} from "../../support/customWorld";
import {HomePage} from '../pages/homePage'


const {Given, When, Then} = require("@cucumber/cucumber")


When("the user selects a product", async function (this: CustomWorld) {
    const homePage = new HomePage()
    await homePage.selectRandomProduct(this)
})
