export class ProfilePage {
  constructor(page) {
    this.page = page;

    this.bioInput =
      page.locator('textarea');

    this.passwordInput =
      page.getByPlaceholder('Password');

    this.saveButton =
      page.getByRole('button', {
        name: 'Update Settings'
      });
  }

  async updateBio(text, currentPassword) {
    await this.bioInput.fill(text);

    await this.passwordInput.fill(currentPassword);

    await Promise.all([
      this.page.waitForResponse(response =>
        response.url().includes('/user') &&
        response.request().method() === 'PUT' &&
        response.ok()
      ),
      this.saveButton.click()
    ]);
  }

  async openSettings() {
    await this.page.goto('https://realworld.qa.guru/#/settings');

    await this.bioInput.waitFor({
      state: 'visible'
    });
  }
}