class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('.card-title');
    this.products = page.locator('div.card');
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

  async verifyPageUrl() {
    try {
      const url = this.page.url();
      return url.includes('angularPractise/shop');
    } catch (e) {
      return false;
    }
  }
}

module.exports = { CheckoutPage };

module.exports = { CheckoutPage };
