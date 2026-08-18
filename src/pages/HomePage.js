import { MainPage } from './MainPage.js';

export class HomePage extends MainPage {
  constructor(page) {
    super(page);

    this.newArticleButton =
      page.locator('a[href="#/editor"]');

    this.userMenuButton =
      page.locator('.nav-link.dropdown-toggle');

    this.settingsButton =
      page.locator('a[href="#/settings"]');
  }

  async clickNewArticle() {
    await this.newArticleButton.click();
  }

  async openSettings() {
    await this.userMenuButton.click();

    await this.settingsButton.click();
  }
}