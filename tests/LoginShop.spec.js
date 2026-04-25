const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const { DashBoardPage } = require('../PageObjects/DashBoardPage');

test('Login and verify iPhone X product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'learning');
  await page.waitForURL('**/angularPractise/shop');
  const dashBoardPage = new DashBoardPage(page);
  const isIphonePresent = await dashBoardPage.isProductVisible('iphone X');
  expect(isIphonePresent).toBeTruthy();
});