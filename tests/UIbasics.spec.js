const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('Browser playwright test', async ({browser}) =>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator("#username");
   const signIn = page.locator("#signInBtn");
   const cardTitles = page.locator(".card-body a");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await userName.type("rahulshetty");
   await page.locator("[type='password']").type("Learning@830$3mK2");
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await userName.fill(" ");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await cardTitles.nth(0).textContent());
   const alltitle = await cardTitles.allTextContents();
   console.log(alltitle);


   



   
});





 test('Page playwright test', async ({page}) =>
{
   
   
   await page.goto("https://google.com");
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");

 
});

test('UI playwright test', async ({page}) =>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   const userName = page.locator("#username");
   const signIn = page.locator("#signInBtn");
   const dropdown = page.locator('select.form-control');
   const document = page.locator(".blinkingText[href*='documents-request']");
   await dropdown.selectOption("Consultant");
   await page.locator('.radiotextsty').last().click();
   await page.locator("#okayBtn").click();
   console.log(await page.locator('.radiotextsty').last().isChecked());
   await expect( page.locator('.radiotextsty').last()).toBeChecked();
   await page.locator('#terms').click();
   await expect ( page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
  expect (await page.locator('#terms').isChecked()).toBeFalsy();
  await expect(document).toHaveAttribute("class", "blinkingText");
   

   //await page.pause();

   
});

test ('child windows handle', async ({browser} )=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator("#username");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const document = page.locator(".blinkingText[href*='documents-request']");
   const [newPage] =await  Promise.all(
   [
   context.waitForEvent('page'),
   document.click(),
   ])
    const text = await newPage.locator(".im-para.red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    
   console.log(domain);
   await page.locator("#username").fill(domain);
   page.pause();
   console.log(await page.locator("#username").inputValue());


})



