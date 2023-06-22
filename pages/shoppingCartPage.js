const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');
const chai = require("chai");
const expect = chai.expect;


class ShoppingCartPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.continueShoppingButtonElement = By.linkText('Continue shopping');
        this.checkoutButtonElement = By.name('checkout');
        this.orderIdElement = By.xpath("//div[contains(@class, 'text-center')]/h2");
        this.amountIdElement = By.xpath("//div[contains(@class, 'text-center')]/h3");
    }

    async continueShopping(){
        const continueO = await this.findElement(this.continueShoppingButtonElement);
        await continueO.click();
    }
    async checkoutButton(){
        const checkout = await this.findElement(this.checkoutButtonElement);
        await checkout.click();
    }

    async getOrderId(){
        const  orderId = await this.getText(this.orderIdElement)
        return orderId.match(/Order #(\d+)/)[1];
    }

    async getPriceNumber(){
        const  priceNumber = await this.getText(this.amountIdElement)
        return priceNumber.match(/\$([\d.]+)/)[1];
    }

    async assertSuccessfullyPlaceOrder(){
        const  orderId = await this.getText(this.orderIdElement)
        expect(orderId).to.contain('You have successfully placed your order')
    }
}
module.exports = ShoppingCartPage;
