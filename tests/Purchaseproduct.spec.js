const {test, expect} = require('@playwright/test');

test('Purchaseproduct', async ({page}) =>
{
    await page.goto("https://blazedemo.com/");
    await page.getByText("Welcome to the Simple Travel Agency!", {exact: true});
    await page.locator("//select[@name= 'fromPort']").click();
    await page.locator("select[name='fromPort']").selectOption('Boston');
    await page.locator("//select[@name= 'toPort']").click();
    await page.locator("select[name='toPort']").selectOption('Rome');
    //await page.waitForTimeout(3000);
    await page.getByText("Choose your departure city:", {exect:true}).click();
    await page.getByRole('button').click();
    await page.getByRole("//tbody//tr//td//input[1]").click();
    await page.close();
    






}
)