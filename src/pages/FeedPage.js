export class FeedPage {
  constructor(page) {
    this.page = page;

    this.globalFeedButton =
      page.locator('.feed-toggle .nav-link', {
        hasText: 'Global Feed'
      });

    this.firstArticlePreview =
      page.locator('.article-preview')
        .filter({
          has: page.locator('h1')
        })
        .first();

    this.firstArticleTitle =
      this.firstArticlePreview.locator('h1');

    this.firstArticleFavoriteButton =
      this.firstArticlePreview.locator('button').first();
  }

  articleTitleByText(title) {
    return this.page.locator('.article-preview h1', {
      hasText: title
    });
  }

  async openGlobalFeed() {
    await this.globalFeedButton.click();
  }

  async favoriteFirstArticle() {
    await this.firstArticleFavoriteButton.click();
  }
}