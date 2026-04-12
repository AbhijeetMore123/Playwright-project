import{test,expect} from '@playwright/test';

test('select 123 female gender', async ({page}) => {
await page.goto('https://testautomationpractice.blogspot.com/');
await page.getByLabel('Female').check();
const check= await page.getByRole('radio',{name: 'Female'}).check();
await expect(check).toBeChecked();





});