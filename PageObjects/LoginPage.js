class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator("[type='password']");
    this.checkbox = page.locator('#terms');
    this.signInBtn = page.locator('#signInBtn');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.checkbox.check();
    await this.signInBtn.click();
  }
}

module.exports = { LoginPage };