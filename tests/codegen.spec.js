import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('abhijeet');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('abhijeetmore400@gmail.com');
  await page.getByRole('heading', { name: 'Two-way Data Binding example' }).getByRole('textbox').click();
  await page.getByRole('heading', { name: 'Two-way Data Binding example' }).getByRole('textbox').fill('abhijeetmore');
  await expect(page.locator('form input[name="name"]')).toBeVisible();
  await expect(page.locator('form')).toContainText('Email');
});