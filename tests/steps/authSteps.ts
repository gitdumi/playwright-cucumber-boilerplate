import {CustomWorld} from "../../support/customWorld";
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";


const {Given, When, Then} = require("@cucumber/cucumber")


Given("that the user is logged in", async function (this: CustomWorld) {
    await global.page.goto(global.env.baseURL)
    const loginPage = new LoginPage(global.page)
    await loginPage.logIn(global.env.users.standard.username, global.env.users.standard.password)
    const homePage = new HomePage(global.page)
    await homePage.waitForPageLoad()
})
