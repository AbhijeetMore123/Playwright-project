const { test, expect } = require('@playwright/test');
const { ProductListingPage } = require('../PageObjects/ProductListingPage');
const { CartPage } = require('../PageObjects/CartPage');
const { CheckoutPage } = require('../PageObjects/CheckoutPage');

test.describe('Green Kart - Product Purchase Flow', () => {
  let productListingPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    productListingPage = new ProductListingPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Navigate to the product listing page
    await productListingPage.goto();
  });

  test('Verify first 3 product prices and add to cart', async ({ page }) => {
    // Get and verify the prices of the first 3 products
    const prices = await productListingPage.getFirstThreeProductPrices();
    
    // Verify we got 3 prices
    expect(prices.length).toBe(3);
    
    // Verify the prices match expected values for Broccoli, Cauliflower, Cucumber
    expect(prices[0]).toBe(120); // Broccoli
    expect(prices[1]).toBe(60);  // Cauliflower
    expect(prices[2]).toBe(48);  // Cucumber
  });

  test('Add first 3 products to cart and proceed to checkout', async ({ page }) => {
    // Get product names for verification
    const productNames = await productListingPage.getFirstThreeProductNames();
    
    // Verify we have 3 product names
    expect(productNames.length).toBe(3);
    
    // Add first 3 products to cart
    await productListingPage.addFirstThreeProductsToCart();
    
    // Click on cart button (this will wait for URL navigation)
    await productListingPage.clickCartButton();
    
    // Verify we are on cart page (cart shows as #/ URL)
    const currentUrl = page.url();
    expect(currentUrl).toContain('#/');
    
    // Verify proceed button is visible
    const proceedVisible = await cartPage.isProceedButtonVisible();
    expect(proceedVisible).toBeTruthy();
  });

  test('Complete checkout flow and verify 3 products and place order', async ({ page }) => {
    // Add first 3 products to cart
    await productListingPage.addFirstThreeProductsToCart();
    
    // Click cart button (this will wait for URL navigation)
    await productListingPage.clickCartButton();
    
    // Verify proceed button is visible
    const proceedVisible = await cartPage.isProceedButtonVisible();
    expect(proceedVisible).toBeTruthy();
    
    // Click proceed to checkout button
    await cartPage.clickProceedToCheckout();
    
    // Wait for the page to load
    await page.waitForTimeout(2000);
    
    // Click Place Order button
    await checkoutPage.clickPlaceOrder();
    
    // Verify success message
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage.length).toBeGreaterThan(0);
  });

  test('End to end test - Complete purchase flow', async ({ page }) => {
    // Step 1: Verify first 3 product prices
    const prices = await productListingPage.getFirstThreeProductPrices();
    expect(prices).toEqual([120, 60, 48]);
    
    // Step 2: Get product names
    const productNames = await productListingPage.getFirstThreeProductNames();
    expect(productNames.length).toBe(3);
    
    // Step 3: Add first 3 products to cart
    await productListingPage.addFirstThreeProductsToCart();
    
    // Step 4: Click on cart button (this will wait for URL navigation)
    await productListingPage.clickCartButton();
    
    // Step 5: Verify cart has items
    const cartItemCount = await cartPage.getCartItemsCount();
    expect(cartItemCount).toBeGreaterThan(0);
    
    // Step 6: Click proceed to checkout
    await cartPage.clickProceedToCheckout();
    
    // Step 7: Wait for checkout page
    await page.waitForTimeout(2000);
    
    // Step 8: Click Place Order button
    await checkoutPage.clickPlaceOrder();
    
    // Step 9: Verify success message appears
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage.length).toBeGreaterThan(0);
  });
});
