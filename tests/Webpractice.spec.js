const {test, expect} = require ('@playwright/test');

test('new test signin', async({page}) =>
{
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.getByAltText("Tricentis Demo Web Shop")).toBeVisible();
    await page.locator("ul[class='top-menu'] li:nth-child(4) a:nth-child(1)").click();
    await page.getByText('heading', {name: 'Apparel & Shoes'});
    await expect(page.getByRole('link',{name : '50\'s Rockabilly Polka Dot Top JR Plus Size', exact:true})).toBeVisible();
    await expect(page.getByRole('link', { name: '50\'s Rockabilly Polka Dot Top JR Plus Size', exact: true })).toBeVisible();
        



})