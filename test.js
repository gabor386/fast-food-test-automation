const faker = require('faker');
const chai = require('chai');
const { Builder, Capabilities} = require("selenium-webdriver");
const HomePage = require("./pages/homePage");
const RegistrationPage = require('./pages/registrationPage');
const LoginPage = require('./pages/loginPage');
const ShoppingCartPage = require("./pages/shoppingCartPage");
const HistoryPage = require("./pages/historyPage");

const PaymentApi = require("./api/paymentApi");
let should = chai.should();


describe('Fast Food UI',function (){

    let registrationPage;
    let loginPage;
    let homePage;
    let shoppingCartPage;
    let historyPage;
    let expect;
    let driver;
    let paymentApi;
    let firstName;
    let lastName;
    let userEmail;
    let username;
    let password;

    beforeEach(function (){
        expect = chai.expect;
        driver = new Builder().withCapabilities(Capabilities.chrome()).build();
        driver.manage().window().maximize();
        registrationPage = new RegistrationPage(driver);
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);
        shoppingCartPage = new ShoppingCartPage(driver);
        historyPage = new HistoryPage(driver);
        paymentApi = new PaymentApi();

        firstName = faker.name.firstName();
        lastName = faker.name.lastName();
        userEmail = faker.internet.email();
        username = faker.internet.userName();
        password = faker.internet.password();
    })


    afterEach(() => driver.quit());


    it('Order Food', async function () {
        //setup in package.json does not work
        //manually setup
        this.timeout(60000);

        await registrationPage.registerUser(firstName, lastName, userEmail, username, password);
        await registrationPage.assertRegistration(firstName, lastName, username);

        await loginPage.login(username, password);
        await loginPage.assertLogin(firstName);

        await homePage.orderDoubleBurger();
        await shoppingCartPage.continueShopping();

        await homePage.orderHeartAttack();
        await shoppingCartPage.checkoutButton();
        await shoppingCartPage.assertSuccessfullyPlaceOrder();

        const orderId = await shoppingCartPage.getOrderId();

        await homePage.navigateToHistory();
        await historyPage.assertOrder(orderId);
    });

    it('Order Food and update payment status', async function ()  {
        //setup in package.json does not work
        //manually setup
        this.timeout(60000);
        await registrationPage.registerUser(firstName, lastName, userEmail, username, password);
        await registrationPage.assertRegistration(firstName, lastName, username);

        await loginPage.login(username, password);
        await loginPage.assertLogin(firstName);

        const userId = await loginPage.getUserId();

        await homePage.orderDoubleBurger();
        await shoppingCartPage.checkoutButton();
        await shoppingCartPage.assertSuccessfullyPlaceOrder();

        const orderId = await shoppingCartPage.getOrderId();
        const price = await shoppingCartPage.getPriceNumber();

        await paymentApi.processPayment(orderId, userId, price);

        await homePage.navigateToHistory();
        await historyPage.assertIsOrderPaid(orderId);
    });
});

