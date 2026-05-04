const {test, expect} = require('@playwright/test');

test("Booking ticket", async ({page}) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("You@email.com").fill("abhijeetmore400@gmail.com");
    await page.locator('#password').fill("Temp@54321");
    await page.locator('#login-btn').click();
    await expect(page.getByRole('heading', { name: 'Discover & Book Amazing Events' })).toBeVisible();
    await page.getByText('Browse Events →', { exact: true }).click();
    await page.getByRole('textbox').fill("Dilli Diwali Mela");
    await expect(page.getByText('Dilli Diwali Mela', { exact: true })).toBeVisible();
    await expect(page.getByText('$300', { exact: true })).toBeVisible();
    await page.locator("#book-now-btn").nth(1).click();
    // Click the event title link instead (more reliable)
    //await page.getByRole('link', { name: 'Dilli Diwali Mela' }).click();
    //await page.waitForLoadState('networkidle');
    
    // Now click the + button
    //await page.getByRole('button', { name: '+' }).click();
    //await expect(page.getByText('2', { exact: true })).toBeVisible();
    await page.getByPlaceholder('Your full name').fill("Abhijeet more");
    await page.getByPlaceholder('you@email.com').fill("abhijeetmore400@gmail.com");
    await page.getByPlaceholder('+91 98765 43210').fill("9876543210");
    await page.locator('#confirm-booking').click();
    await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await expect(page.getByRole('heading', { name: 'Dilli Diwali Mela' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel Booking' }).click();
    await expect(page.getByRole('heading', { name: 'Cancel this booking?' })).toBeVisible();
    await page.getByRole('button', { name: 'Yes, cancel it' }).click();
    await expect(page.getByText('Booking Cancelled')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No bookings yet' })).toBeVisible();
});