const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class HomePage extends BasePage {

    constructor(driver) {
        super(driver);
        this.selectElementDoubleBurger = By.css('div.panel.panel-warning select[name="side"]');
        this.qualityInputElementDoubleBurger = By.css("div.panel-warning input[name='quantity']");
        this.orderButtonElementDoubleBurger = By.xpath("//div[contains(., 'Double burger')]/following-sibling::div//input[@value='ORDER NOW']")
        this.sideDishOptionElementDoubleBurger = By.css('div.panel.panel-warning select[name="side"] option[value="ms"]');
        this.formElementHeartAttack = By.css('div.panel-success form');
        this.sideDishSelectElementHeartAttack = By.css('select[name="side"]');
        this.qualityInputElementHeartAttack = By.css('input[name="quantity"]');
        this.cutleryCheckboxElementHeartAttack = By.css('input[name="cutlery"]');
        this.orderButtonElementHeartAttack = By.css('input[value="ORDER NOW"]');
        this.sideDishOptionElementHeartAttack = By.css('option[value="or"]');
        this.historyNavigationBarElement = By.linkText('Order history');
    }

    async orderDoubleBurger() {
        await this.selectOptionByValueDoubleBurger();
        const quantityInputDoubleBurger = await this.findElement(this.qualityInputElementDoubleBurger);
        await quantityInputDoubleBurger.clear();
        await quantityInputDoubleBurger.sendKeys('2');
        await this.click(this.orderButtonElementDoubleBurger);
    }

    async selectOptionByValueDoubleBurger() {
        await this.click(this.selectElementDoubleBurger);
        await this.click(this.sideDishOptionElementDoubleBurger);
    }

    async orderHeartAttack() {
        const form = await this.findElement(this.formElementHeartAttack);

        const sideDishSelect = await form.findElement(this.sideDishSelectElementHeartAttack);
        await sideDishSelect.findElement(this.sideDishOptionElementHeartAttack).click();

        const quantityInput = await form.findElement(this.qualityInputElementHeartAttack);
        await quantityInput.clear();
        await quantityInput.sendKeys('4');

        const cutleryCheckbox = await form.findElement(this.cutleryCheckboxElementHeartAttack);
        await cutleryCheckbox.click();

        const orderButton = await form.findElement(this.orderButtonElementHeartAttack);
        await orderButton.click();
    }

    async navigateToHistory(){
        await this.click(this.historyNavigationBarElement);
    }

}
module.exports = HomePage;
