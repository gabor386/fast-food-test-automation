const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');
const chai = require('chai');
const expect = chai.expect;

class HistoryPage extends BasePage {

    constructor(driver) {
        super(driver);
    }

    //sometimes the order is on the first row, sometimes on second row
    async assertOrder(orderId) {
        const orderRow = await this.driver.findElement(By.xpath(`//td[@class='order' and text()='#${orderId}']/parent::tr`));
        const orderTotal = await orderRow.findElement(By.xpath("./td[@class='total']")).getText();
        const orderStatus = await orderRow.findElement(By.xpath("./td[@class='status']")).getText();
        const paymentStatus = await orderRow.findElement(By.xpath("./td[@class='payment']")).getText();

        expect(orderTotal).to.equal('$80.54');
        expect(paymentStatus).to.equal('pending');
        expect(orderStatus).to.equal('Ordered');

    }

    async assertIsOrderPaid(orderId) {
        const orderRow = await this.driver.findElement(By.xpath(`//td[@class='order' and text()='#${orderId}']/parent::tr`));
        const paymentStatus = await orderRow.findElement(By.xpath("./td[@class='payment']")).getText();
        expect(paymentStatus).to.equal('paid');
    }
}
module.exports = HistoryPage;
