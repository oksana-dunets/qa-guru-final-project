export class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.usernameInput =
      page.getByRole('textbox', {
        name: 'Your Name',
      });

    this.emailInput =
      page.getByRole('textbox', {
        name: 'Email',
      });

    this.passwordInput =
      page.getByRole('textbox', {
        name: 'Password',
      });

    this.signUpButton =
      page.getByRole('button', {
        name: 'Sign up',
      });
  }

  async register(user) {
    await this.usernameInput.fill(user.username);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);

    await this.signUpButton.click();
  }
}