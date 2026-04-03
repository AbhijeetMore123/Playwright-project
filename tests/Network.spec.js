const { test, expect } = require('@playwright/test');


test('Security purpose code', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("abhijeetmore400@gmail.com");
    await page.locator("#userPassword").fill("Abhi@987654");
    await page.getByRole('button', {name: 'login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    await page.locator('(//div//button)[5]').click();
    await page.waitForTimeout(3000);
    await page.locator('(//ul//li)[3]').click();
    await page.waitForTimeout(3000);

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*' })
    );

    await page.getByRole("button", {name: 'view'}).first().click();
    await expect( page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause();

});