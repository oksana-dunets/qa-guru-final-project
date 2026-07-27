export class EditorPage {
  constructor(page) {
    this.page = page;

    this.titleInput =
      page.getByPlaceholder('Article Title');

    this.descriptionInput =
      page.getByPlaceholder("What's this article about?");

    this.bodyInput =
      page.getByPlaceholder('Write your article (in markdown)');

    this.publishButton =
      page.getByRole('button', {
        name: 'Publish Article'
      });

    this.updateArticleButton =
      page.getByRole('button', {
        name: 'Update Article'
      });
  }

  async createArticle(title, description, body) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);

    await this.publishButton.click();
  }

  async updateArticleTitle(newTitle) {
    await this.titleInput.fill(newTitle);

    await this.updateArticleButton.click();
  }
}