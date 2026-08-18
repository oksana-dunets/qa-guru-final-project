export class FeedPage {
  constructor(page) {
    this.page = page;

    this.globalFeedButton = page.locator(
      '.feed-toggle .nav-link',
      {
        hasText: 'Global Feed',
      }
    );

    this.firstArticlePreview = page
      .locator('.article-preview')
      .filter({
        has: page.locator('h1'),
      })
      .first();

    this.firstArticleTitle =
      this.firstArticlePreview.locator('h1');

    this.firstArticleFavoriteButton =
      this.firstArticlePreview
        .getByRole('button')
        .first();
  }

  articleTitleByText(title) {
    return this.page
      .locator('.article-preview')
      .getByRole('heading', {
        name: title,
        exact: true,
      });
  }

  articlePreviewByTitle(title) {
    return this.page
      .locator('.article-preview')
      .filter({
        has: this.page.getByRole('heading', {
          name: title,
          exact: true,
        }),
      });
  }

  articleFavoriteButtonByTitle(title) {
    return this
      .articlePreviewByTitle(title)
      .getByRole('button')
      .first();
  }

  async openGlobalFeed() {
    await this.globalFeedButton.click();
  }

  async favoriteFirstArticle() {
    await this.firstArticleFavoriteButton.click();
  }

  async openArticleByTitle(title) {
  await this.articleTitleByText(title).click();
}

  async favoriteArticleByTitle(title) {
    await this
      .articleFavoriteButtonByTitle(title)
      .click();
  }

}