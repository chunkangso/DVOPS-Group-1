const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

// Test Suite: Sauce Demo 
describe('Testing Sauce Demo Login Page', () => {
    var driver; // Declare a WebDriver variable
    beforeEach(async () => {
        // Initialize a Chrome WebDriver instance
        driver = await new Builder().forBrowser('chrome').build();
    });
    afterEach(async () => {
        // Close the browser after each test
        await driver.quit();
    })

    it('Should show title: Swag Labs', async () => {
        await driver.get('https://www.saucedemo.com/'); // Navigate Sauce Demo
        const title = await driver.getTitle(); // Get the title of the web page
        expect(title).to.equal("Swag Labs"); // Assert that title matches "Swag Labs"
    });
    it('Should show error - invalid credentials', async () => {
        await driver.get('https://www.saucedemo.com/');
        // Locate and interact with the username field
        const username = await driver.findElement(By.id('user-name'));
        await username.click();
        await username.sendKeys('john');
        //Locate and interact with the password field
        const password = await driver.findElement(By.id('password'));
        await password.click();
        await password.sendKeys('123456');
        // Locate and interact with the login button
        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();
        // Locate the error message element and retrieve its inner HTML
        const errorElement = await driver.findElement(By.xpath("//h3[@data-test='error']"));
        const errorMsg = await errorElement.getAttribute("innerHTML");
        // Assert that the error message contains the expected text
        expect(errorMsg).to.contain("Epic sadface: Username and password do not match any user in this service");
    });
    it('Should show error - Username required', async () => {
        await driver.get('https://www.saucedemo.com/');
        //Locate and interact with the password field
        const password = await driver.findElement(By.id('password'));
        await password.click();
        await password.sendKeys('123456');
        // Locate and interact with the login button
        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();
        // Locate the error message element and retrieve its inner HTML
        const errorElement = await driver.findElement(By.xpath("//h3[@data-test='error']"));
        const errorMsg = await errorElement.getAttribute("innerHTML");
        // Assert that the error message contains the expected text
        expect(errorMsg).to.contain("Epic sadface: Username is required");
    });
    it('Should show error - Password required', async () => {
        await driver.get('https://www.saucedemo.com/');
        // Locate and interact with the username field
        const username = await driver.findElement(By.id('user-name'));
        await username.click();
        await username.sendKeys('john');
        // Locate and interact with the login button
        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();
        // Locate the error message element and retrieve its inner HTML
        const errorElement = await driver.findElement(By.xpath("//h3[@data-test='error']"));
        const errorMsg = await errorElement.getAttribute("innerHTML");
        // Assert that the error message contains the expected text
        expect(errorMsg).to.contain("Epic sadface: Password is required");
    });
    it('Should bring user to inventory page', async () => {
        await driver.get('https://www.saucedemo.com/');
        // Locate and interact with the username field
        const username = await driver.findElement(By.id('user-name'));
        await username.click();
        await username.sendKeys('standard_user');
        //Locate and interact with the password field
        const password = await driver.findElement(By.id('password'));
        await password.click();
        await password.sendKeys('secret_sauce');
        // Locate and interact with the login button
        const loginButton = await driver.findElement(By.id('login-button'));
        await loginButton.click();
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('https://www.saucedemo.com/inventory.html');

        // Locate and interact with the Add to Cart button
        const addToCart = await driver.findElement(By.xpath("//button[text()='Add to cart']"));
        await addToCart.click();
        // Assert that value in badge is 1
        const badge = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
        expect(await badge.getText()).to.equal('1');
    });


});