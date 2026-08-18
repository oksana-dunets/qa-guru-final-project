export class ArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitle = page.locator('h1');
    this.articleBody = page.locator('.article-content');
    this.tagList = page.locator('.tag-list');

    this.authorProfileLink = page
      .locator('.article-meta')
      .getByRole('link')
      .first();

    this.editArticleButton = page
      .getByRole('link', {
        name: /Edit Article/,
      })
      .first();

    this.deleteArticleButton = page
      .getByRole('button', {
        name: /Delete Article/,
      })
      .first();
  }

  async openAuthorProfile() {
    await this.authorProfileLink.click();
  }

  async openEditArticle() {
    await this.editArticleButton.click();
  }

  async deleteArticle() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.deleteArticleButton.click();
  }
}