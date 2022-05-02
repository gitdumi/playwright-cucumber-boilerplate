import PageObject from "../../support/pageObject";

export class LoginPage extends PageObject {


    private loginUsernameInputField = this.page.locator('#user-name')
    private loginPasswordInputField = this.page.locator('#password')
    private loginButton = this.page.locator('#login-button')


    async logIn(user: string, password: string) {
        await this.loginUsernameInputField.fill(user)
        await this.loginPasswordInputField.fill(password)
        await this.loginButton.click({force: true})
    }
}