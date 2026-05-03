class CartPage {
  constructor(page) {
    this.page = page;
    // Look for "Proceed to Checkout" button
    this.proceedButton = page.locator('button:has-text("Proceed to Checkout")').first();
    // More flexible approach - look for button with "Proceed to Checkout" text content
    this.proceedButtonFallback = page.locator('button').filter({ hasText: /Proceed to Checkout/i }).first();
    this.cartItems = page.locator('tr');
    this.totalAmount = page.locator('td.amount strong');
  }

  async isProceedButtonVisible() {
    try {
      // Try main selector first, then fallback
      const isVisible = await this.proceedButton.isVisible({ timeout: 5000 }).catch(() => false);
      if (isVisible) return true;
      
      // Try fallback selector
      return await this.proceedButtonFallback.isVisible({ timeout: 5000 }).catch(() => false);
    } catch (e) {
      return false;
    }
  }

  async clickProceedToCheckout() {
    try {
      // Set up navigation listener BEFORE clicking - look for any navigation away from cart
      const navigationPromise = this.page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }).catch(() => null);
      
      // Try main selector first, then fallback
      try {
        await this.proceedButton.click({ timeout: 5000 });
      } catch (e) {
        // Use fallback selector
        await this.proceedButtonFallback.click({ timeout: 5000 });
      }
      
      // Wait for the navigation to complete
      await navigationPromise;
    } catch (e) {
      console.log('Error clicking proceed button:', e.message);
      throw e;
    }
  }

  async getCartItemsCount() {
    try {
      const items = await this.cartItems.all();
      // Subtract header row if it exists
      return items.length > 1 ? items.length - 1 : items.length;
    } catch (e) {
      return 0;
    }
  }

  async getCartItemNames() {
    const names = [];
    try {
      const items = await this.cartItems.all();
      
      // Skip header row (first item if it exists)
      const startIndex = items.length > 0 ? 1 : 0;
      for (let i = startIndex; i < items.length; i++) {
        const nameText = await items[i].locator('td').first().textContent();
        if (nameText && nameText.trim()) {
          names.push(nameText.trim());
        }
      }
    } catch (e) {
      console.log('Error getting cart items:', e.message);
    }
    
    return names;
  }
}

module.exports = { CartPage };
