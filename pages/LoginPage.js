export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput =
      page.getByPlaceholder('Email');

    this.passwordInput =
      page.getByPlaceholder('Password');

    this.loginButton =
      page.getByRole('button', {
        name: 'Login'
      });
  }

  async open() {
    await this.page.goto('https://realworld.qa.guru/#/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await Promise.all([
      this.page.waitForURL('**/#/'),
      this.loginButton.click()
    ]);
  }
}