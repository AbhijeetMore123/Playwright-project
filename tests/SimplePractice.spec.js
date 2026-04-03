import {test, expect} from "@playwright/test";

test('playwright special locators', async({page})=>
{
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel('Check me out if you Love IceCreams!').click();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption("Male");
  await page.getByPlaceholder('Password').fill("1234");
  await page.locator('[name="email"]').fill("abhijetmore400@gmail.com");
  await page.locator("div[class='form-group'] input[name='name']").fill("abhijeet");
  await page.getByRole('button', {name: 'submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link", {name : 'shop'}).click();
  await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole("button").click();



})