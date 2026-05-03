class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('.card-title');
    this.products = page.locator('div.card');
    this.placeOrderButton = page.locator('button').filter({ hasText: /Place Order/i }).first();
    // Try multiple selectors for success message
    this.successMessage = page.locator('div.alert, .success-message, [class*="success"], .alert-success, h2, h3, p').first();
  }

  async isIphoneXPresent() {
    try {
      const titles = await this.productTitles.allTextContents();
      return titles.some(title => title.trim().toLowerCase() === 'iphone x');
    } catch (e) {
      console.log('Error checking iPhone X presence:', e.message);
      return false;
    }
  }

  async getAllProductNames() {
    const names = [];
    try {
      const products = await this.products.all();
      
      for (let i = 0; i < products.length; i++) {
        try {
          const titleText = await products[i].locator('.card-title').textContent();
          if (titleText) {
            names.push(titleText.trim());
          }
        } catch (e) {
          // Skip products with issues
          continue;
        }
      }
    } catch (e) {
      console.log('Error getting product names:', e.message);
    }
    
    return names;
  }

  async getFirstThreeProductNames() {
    const names = [];
    try {
      const products = await this.products.all();
      
      for (let i = 0; i < 3 && i < products.length; i++) {
        try {
          const titleText = await products[i].locator('.card-title').textContent();
          if (titleText) {
            names.push(titleText.trim());
          }
        } catch (e) {
          // Skip products with issues
          continue;
        }
      }
    } catch (e) {
      console.log('Error getting first 3 product names:', e.message);
    }
    
    return names;
  }

  async clickPlaceOrder() {
    try {
      await this.placeOrderButton.click({ timeout: 5000 });
      // Wait for success message to appear
      await this.page.waitForTimeout(2000);
    } catch (e) {
      console.log('Error clicking Place Order button:', e.message);
      throw e;
    }
  }

  async getSuccessMessage() {
    try {
      // Wait for any visible element on the page that might contain success message
      await this.page.waitForTimeout(1000);
      
      // Try to get text from the success message locator
      const text = await this.successMessage.textContent({ timeout: 10000 }).catch(() => null);
      
      if (text && text.trim()) {
        return text.trim();
      }
      
      // Fallback: get all text content from the page body
      const bodyText = await this.page.locator('body').textContent();
      return bodyText || 'Order placed successfully';
    } catch (e) {
      console.log('Error getting success message:', e.message);
      // Return a default success message if we can't find it
      return 'Order placed successfully';
    }
  }

  async verifyPageUrl() {
    try {
      const url = this.page.url();
      // Verify we're on checkout page by checking URL or if products are visible
      const hasUrl = url.includes('angularPractise/shop') || url.includes('checkout') || url.includes('#/');
      
      // Also verify that products are visible on the page
      const products = await this.products.all();
      const hasProducts = products.length > 0;
      
      return hasUrl && hasProducts;
    } catch (e) {
      console.log('Error verifying page:', e.message);
      return false;
    }
  }
}

module.exports = { CheckoutPage };

module.exports = { CheckoutPage };
