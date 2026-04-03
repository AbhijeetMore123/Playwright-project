const {test, expect} = require('@playwright/test');
let webcontext; 

test.afterAll(async({browser})=>
{
    const context = await browser.newContext();
    //const page = await context.newPage();
   const email = "abhijeetmore400@gmail.com";
   const passwroder = "Abhi@987654";
    
   //await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator('#userEmail').fill(email);
   await page.locator('#userPassword').fill(passwroder);
   await page.locator('[name="login"]').click();
   await page.waitForLoadState('networkidle'); 
   await context.storageState({path: 'state.json'});
   webcontext = await browser.newContext({storageState: 'state.json'});
})


test ('client app login', async () =>
{
   const productname = 'ZARA COAT 3';
   const page =await webcontext.newPage();
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const products = page.locator('.card-body');
   //await page.locator('.card-body b').first().waitFor();
   const titles = await page.locator('.card-body b').allTextContents();
   console.log(titles);
   const count = await products.count();
   for(let i =0; i < count; ++i)
   {
      if( await products.nth(i).locator('b').textContent() === productname)
      {
        await products.nth(i).locator("text= Add To Cart").click();
        
        break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator('div li').first().waitFor();
   const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=checkout").click();
   //await page.locator('input[type="text"]').fill("1234 5678 9654 1254");
   //await page.locator('input[type="text"]').fill("654");
   await page.getByPlaceholder('Select Country').pressSequentially("ind", {delay:150});
   const dropdown = page.locator(".ta-results.list-group.ng-star-inserted");
   
   await dropdown.waitFor({ state: 'visible' });
   const options = dropdown.locator('button');
   const optionCount = await options.count();
   /* for(let i = 0; i< optionCount; ++i)
   {
      const text = await dropdown.locator('button').nth(i).textContent();
      if (text === "India")
      {
         await dropdown.locator('button').nth(i).click();
         break;
      }
   }
      */
   
   //await page.locator('.ta-results button').filter( { hasText: "India" }).click();
   await page.locator('button').filter({ hasText: 'India' }).last().click();
   await expect (page.locator("label[type='text']")).toHaveText(email);
   await page.locator('text=PLACE ORDER').click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.");
   const orderid= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderid);
   await page.locator("label[routerlink='/dashboard/myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   await page.locator('button').filter({ hasText: 'View' }).first().click();





  


});