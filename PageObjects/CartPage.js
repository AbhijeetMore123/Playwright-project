class CartPage {
  constructor(page) {
    this.page = page;
    // Try multiple selectors for the proceed button
    this.proceedButton = page.locator('button:has-text("Proceed")').first();
    this.cartItems = page.locator('tr');
    this.totalAmount = page.locator('td.amount strong');
  }

  async isProceedButtonVisible() {
    try {
      return await this.proceedButton.isVisible({ timeout: 5000 });
    } catch (e) {
      return false;
    }
  }

  async clickProceedToCheckout() {
    try {
      await this.proceedButton.click({ timeout: 5000 });
      // Wait for checkout page to load
      await this.page.waitForURL('**/angularPractise/shop', { timeout: 15000 });
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
