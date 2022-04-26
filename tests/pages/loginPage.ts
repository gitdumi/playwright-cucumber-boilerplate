import PageObject from "../../support/pageObject";
import {expect, Locator} from "@playwright/test";
import {CustomWorld} from "../../support/customWorld";

export class LoginPage extends PageObject {

    private loginUsernameInputField = '#user-name'
    private loginPasswordInputField = '#password'
    private loginButton = '#login-button'


    async logIn(user: string, password: string) {
        await this.page.fill(this.loginUsernameInputField, user)
        await this.page.fill(this.loginPasswordInputField, password)
        await this.page.locator(this.loginButton).click({force: true})
    }
}