import{test,expect} from '@playwright/test';
test('select female gender',async({page}) => {
await page.goto('https://testautomationpractice.blogspot.com/');
await page.getByLabel('Female').check();
await page.getByRole('radio',{name: 'Female'}).check();
await expect(page.getByLabel('Female')).tobeChecked();





});