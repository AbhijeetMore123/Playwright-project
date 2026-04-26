class ProductListingPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('img[alt="Cart"]').first();
    this.productCards = page.locator('.product');
    this.addToCartButtons = page.locator('button:has-text("ADD TO CART")');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  }

  async getFirstThreeProductPrices() {
    const prices = [];
    const products = await this.productCards.all();
    
    for (let i = 0; i < 3 && i < products.length; i++) {
      const priceText = await products[i].locator('p').textContent();
      // Extract numeric value from price text (e.g., "₹ 120" -> 120)
      const price = parseInt(priceText.replace(/[^0-9]/g, ''));
      prices.push(price);
    }
    
    return prices;
  }

  async addFirstThreeProductsToCart() {
    const buttons = await this.addToCartButtons.all();
    
    for (let i = 0; i < 3 && i < buttons.length; i++) {
      await buttons[i].click();
      // Small delay between clicks to ensure action is processed
      await this.page.waitForTimeout(500);
    }
  }

  async clickCartButton() {
    const cartBtn = this.page.locator('img[alt="Cart"]').first();
    await cartBtn.click();
    // Wait for cart page to load - use a more flexible approach
    await this.page.waitForNavigation({ url: /cart/, timeout: 15000 }).catch(() => {
      console.log('Navigation did not match cart URL pattern');
    });
    // Alternatively, wait for cart page elements to be visible
    await this.page.locator('button:has-text("Proceed")').first().waitFor({ timeout: 10000 }).catch(() => {
      console.log('Proceed button not found');
    });
  }

  async getFirstThreeProductNames() {
    const names = [];
    const products = await this.productCards.all();
    
    // Only get first 3 products
    for (let i = 0; i < 3 && i < products.length; i++) {
      const nameText = await products[i].locator('h4').textContent();
      if (nameText) {
        names.push(nameText.trim());
      }
    }
    
    return names;
  }
}

module.exports = { ProductListingPage };
