const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');
const chai = require('chai');
const expect = chai.expect;
class LoginPage extends BasePage {

    constructor(driver) {
        super(driver);
        this.usernameInput = By.name('username');
        this.passwordInput = By.name('password');
        this.loginButton = By.name('login');
        this.loginLink = By.xpath("//ul[@class='nav navbar-nav navbar-right']//a[@href='/login']");
        this.welcomeMessage = By.xpath("//h2[contains(., 'Welcome back')]");
        this.userIdElement = By.xpath("//li/a/strong");
    }

    async login(username, password) {
        await this.click(this.loginLink);
        await this.sendKeys(this.usernameInput, username);
        await this.sendKeys(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async assertLogin(firstname) {
        await this.waitForElement(this.welcomeMessage);
        expect(await this.getText(this.welcomeMessage)).to.equal('Welcome back, ' + firstname);
    }

    async  getUserId(){
        const idElement = await this.driver.findElement(this.userIdElement);
        const idText = await idElement.getText();
        return idText.split(': ')[1];
    }
}

module.exports = LoginPage;
