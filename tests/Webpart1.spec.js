const {test, expect, request} = require ('@playwright/test');
const payload = {userEmail: "abhijeetmore400@gmail.com", userPassword: "Abhi@987654"};
let token;


test.beforeAll(async()=>
{
    const apicontext = await request.newContext();
   const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",

{
    data:payload
})

await expect(loginresponse.ok()).toBeTruthy();
const loginresponsejson = await loginresponse.json();
token = loginresponsejson.token;
console.log(token);

});

test.beforeEach(() =>
{

});





test("afegrhrehtjt", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#username").fill("abhijeetmore400@gmail.com");
    await page.locator("#password").fill("Abhi@987654");
    await page.locator("#login").click();

});