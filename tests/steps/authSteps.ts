import {CustomWorld} from "../../support/customWorld";
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";


const {Given, When, Then} = require("@cucumber/cucumber")
const fs = require("fs")


Given("that the user is logged in", async function (this: CustomWorld) {
    const path = 'support/config/standard_user_login_state.json'
    const loginStateExists = fs.existsSync(path)

    if (loginStateExists) {
        const context = await global.browser.newContext({ storageState: {
                "cookies": [
                    {
                        "sameSite": "Lax",
                        "name": "session-username",
                        "value": "standard_user",
                        "domain": "www.saucedemo.com",
                        "path": "/",
                        "expires": 1650985600,
                        "httpOnly": false,
                        "secure": false
                    }
                ],
                "origins": []
            }})
        const page = await context.newPage()
        console.log(page.localStorage)
        const homePage = new HomePage(page)
        await homePage.waitForPageLoad()
    } else {
        global.context = await global.browser.newContext()
        global.page = await global.context.newPage()
        await global.page.goto(global.env.baseURL)
        const loginPage = new LoginPage(global.page)
        await loginPage.logIn(global.env.users.standard.username, global.env.users.standard.password)
        const homePage = new HomePage(global.page)
        await homePage.waitForPageLoad()
        await global.context.storageState({path: path})
    }
})
