const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');
const chai = require('chai');
const expect = chai.expect;

class RegistrationPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.firstNameInput = By.name('firstname');
        this.lastNameInput = By.name('lastname');
        this.emailInput = By.name('email');
        this.usernameInput = By.name('username');
        this.passwordInput = By.name('password');
        this.confirmPasswordInput = By.name('passwordAgain');
        this.registerButton = By.name('register');
        this.successMessage = By.xpath("//div[contains(@class, 'alert-success')]");
        this.registerLink = By.xpath("//a[@href='/register']");
    }

    async clickRegisterLink() {
        await this.click(this.registerLink);
    }

    async registerUser(firstName, lastName, email, username, password) {
        await this.clickRegisterLink(); // Click on the register link to navigate to the registration page
        await this.sendKeys(this.firstNameInput, firstName);
        await this.sendKeys(this.lastNameInput, lastName);
        await this.sendKeys(this.emailInput, email);
        await this.sendKeys(this.usernameInput, username);
        await this.sendKeys(this.passwordInput, password);
        await this.sendKeys(this.confirmPasswordInput, password);
        await this.click(this.registerButton);
    }

    async assertRegistration(fistName, lastName, userName) {
        await this.waitForElement(this.successMessage);
        expect(await this.getText(this.successMessage)).to.equal('Success! You have successfully registered new user ' + fistName + ', ' + lastName + ' (' + userName + ').');
    }
}

module.exports = RegistrationPage;