class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('.card-title');
  }

  async isProductVisible(productName) {
    const titles = await this.productTitles.allTextContents();
    return titles.some(title => title.trim() === productName);
  }
}

module.exports = { DashBoardPage };