const {test, expect} = require('@playwright/test');

test("screenshot scenario", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByRole('button',{name:'show'})).toBeVisible();
    await expect(page.locator("#displayed-text")).toBeVisible();
    //await page.screenshot({path: 'screenshot.png'});
    await page.screenshot({ path: 'fullpage.png', fullPage: true });
    await page.locator("#displayed-text").screenshot({path: 'pathscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test.only("Visual test screenshot", async({page}) =>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

});