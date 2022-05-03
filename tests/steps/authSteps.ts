import {CustomWorld} from "../../support/customWorld";
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {USERS} from "../../support/constants";

const {Given, When, Then} = require("@cucumber/cucumber")


Given("that the {string} user is logged in", async function (this: CustomWorld, user: string) {
    await global.page.goto(global.env.baseURL)

    const loginPage = new LoginPage()
    switch (user) {
        case USERS.STANDARD:
            await loginPage.logIn(global.env.users.standard.username, global.env.users.standard.password)
            break
        case USERS.PROBLEM:
            await loginPage.logIn(global.env.users.problem.username, global.env.users.problem.password)
            break
    }

    const homePage = new HomePage()
    await homePage.waitForPageLoad()
})