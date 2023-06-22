const {   until } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.driver.get('http://test.qa.rs');
    }
    async quit() {
        if (BasePage.driver) {
            await this.driver.quit();
            BasePage.driver = null;
        }
    }

    async findElement(elementLocator) {
        await this.driver.wait(until.elementLocated(elementLocator), 500);
        return await this.driver.findElement(elementLocator);
    }

    async click(elementLocator) {
        const element = await this.findElement(elementLocator);
        await element.click();
    }

    async sendKeys(elementLocator, text) {
        const element = await this.findElement(elementLocator);
        await element.sendKeys(text);
    }

    async waitForElement(elementLocator) {
        await this.driver.wait(until.elementLocated(elementLocator), 500);
    }

    async getText(elementLocator) {
        const element = await this.findElement(elementLocator);
        return await element.getText();
    }

    async clear(elementLocator) {
        const element = await this.driver.findElement(elementLocator);
        await element.clear();
    }
}
module.exports = BasePage;
