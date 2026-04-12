import{test,expect} from '@playwright/test';


test('select 123 female gender', async ({page}) => {
await page.goto('https://testautomationpractice.blogspot.com/');
await page.getByRole('radio',{name: 'Female'}).check();
await expect(page.getByRole('radio',{name: 'Female'})).toBeChecked();
});