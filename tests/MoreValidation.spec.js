const {test, expect} = require('@playwright/test');

test("morevalidation test", async({page})=>
{

   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   await expect( page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text")).toBeHidden();
   await page.pause();
   //To handle the dialogbox use this method.
   page.on('dialog', dialog => dialog.accept());
   await page.locator("#confirmbtn").click();
   await page.locator("#mousehover").hover();

   


});

