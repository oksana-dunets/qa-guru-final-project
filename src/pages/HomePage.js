export class HomePage {
  constructor(page) {
    this.page = page;

    this.newArticleButton =
      page.locator('a[href="#/editor"]');

    this.userMenuButton =
      page.locator('.nav-link.dropdown-toggle', {
        hasText: 'Oksana'
      });

    this.settingsButton =
      page.locator('a[href="#/settings"]');
  }

  async open() {
    await this.page.goto('https://realworld.qa.guru/#/');
  }

  async clickNewArticle() {
    await this.newArticleButton.click();
  }

  async openSettings() {
    await this.userMenuButton.click();

    await this.settingsButton.click();
  }
}