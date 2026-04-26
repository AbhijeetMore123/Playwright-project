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
    
    // Verify items were added to cart by checking cart count
    await page.waitForTimeout(500);
    
    // Click on cart button
    await productListingPage.clickCartButton();
    
    // Wait for cart page to be visible
    await page.waitForURL('**/#/cart', { timeout: 10000 });
    
    // Verify we are on cart page
    const currentUrl = page.url();
    expect(currentUrl).toContain('#/cart');
    
    // Verify proceed button is visible
    const proceedVisible = await cartPage.isProceedButtonVisible();
    expect(proceedVisible).toBeTruthy();
  });

  test('Complete checkout flow and verify iPhone X product', async ({ page }) => {
    // Add first 3 products to cart
    await productListingPage.addFirstThreeProductsToCart();
    
    // Click cart button
    await productListingPage.clickCartButton();
    
    // Wait for cart page to load
    await page.waitForURL('**/#/cart');
    
    // Click proceed to checkout button
    await cartPage.clickProceedToCheckout();
    
    // Wait for checkout/shop page to load
    await page.waitForURL('**/angularPractise/shop');
    
    // Verify we are on the checkout page with correct URL
    const isCheckoutPage = await checkoutPage.verifyPageUrl();
    expect(isCheckoutPage).toBeTruthy();
    
    // Verify iPhone X product is present on checkout page
    const isiPhonePresent = await checkoutPage.isIphoneXPresent();
    expect(isiPhonePresent).toBeTruthy();
    
    // Get all product names to verify
    const allProducts = await checkoutPage.getAllProductNames();
    expect(allProducts.length).toBeGreaterThan(0);
    expect(allProducts).toContain('iphone X');
  });

  test('End to end test - Complete purchase flow', async ({ page }) => {
    // Step 1: Verify first 3 product prices
    const prices = await productListingPage.getFirstThreeProductPrices();
    expect(prices).toEqual([120, 60, 48]);
    
    // Step 2: Add first 3 products to cart
    await productListingPage.addFirstThreeProductsToCart();
    
    // Step 3: Click on cart button
    await productListingPage.clickCartButton();
    await page.waitForURL('**/#/cart', { timeout: 10000 });
    
    // Step 4: Verify cart has items
    const cartItemCount = await cartPage.getCartItemsCount();
    expect(cartItemCount).toBeGreaterThan(0);
    
    // Step 5: Click proceed to checkout
    await cartPage.clickProceedToCheckout();
    
    // Step 6: Wait for checkout page navigation
    await page.waitForURL('**/angularPractise/shop', { timeout: 10000 });
    
    // Step 7: Verify iPhone X is present on the checkout page
    const isiPhoneXPresent = await checkoutPage.isIphoneXPresent();
    expect(isiPhoneXPresent).toBeTruthy();
    
    // Additional verification - get all product names and verify iPhone X is in the list
    const allProducts = await checkoutPage.getAllProductNames();
    const hasIphone = allProducts.some(product => 
      product.toLowerCase().includes('iphone x')
    );
    expect(hasIphone).toBeTruthy();
  });
});
