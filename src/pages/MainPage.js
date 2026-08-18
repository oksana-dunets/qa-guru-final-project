export class MainPage {
  constructor(page) {
    this.page = page;

    this.signInButton = page.locator('a[href="#/login"]');
    this.signUpButton = page.locator('a[href="#/register"]');
  }

  async open() {
  await this.page.goto('/#/', {
    waitUntil: 'load',
    timeout: 60_000,
  });
}

  async openLoginPage() {
    await this.signInButton.click();
  }

  async openRegistrationPage() {
    await this.signUpButton.click();
  }
}