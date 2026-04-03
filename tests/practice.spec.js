const  {test, expect} = require('@playwright/test');


test('testsa playwright test', async ({page}) =>
{
   
  
   //const cardTitles = await page.locator("")
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator('#userEmail').fill("abhijeetmore400@gmail.com");
   await page.locator('#userPassword').type("Qwertyuiop@1");
   await page.locator('#login').click();
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   
   
   

 
});