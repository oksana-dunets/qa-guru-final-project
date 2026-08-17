import {
  ArticlePage,
  EditorPage,
  FeedPage,
  HomePage,
} from '../pages/index.js';

export class ArticleFacade {
  constructor(page) {
    this.homePage = new HomePage(page);
    this.editorPage = new EditorPage(page);
    this.articlePage = new ArticlePage(page);
    this.feedPage = new FeedPage(page);
  }

  async createArticle(article) {
    await this.homePage.open();
    await this.homePage.clickNewArticle();

    await this.editorPage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tagList
    );
  }

  async editArticle(article, updatedArticle) {
    await this.homePage.open();
    await this.homePage.clickNewArticle();

    await this.editorPage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tagList
    );

    await this.articlePage.openEditArticle();

    await this.editorPage.updateArticleTitle(
      updatedArticle.title
    );
  }

  async deleteArticle(article) {
    await this.homePage.open();
    await this.homePage.clickNewArticle();

    await this.editorPage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tagList
    );

    await this.articlePage.deleteArticle();

    await this.feedPage.openGlobalFeed();
  }

  async favoriteArticle(article) {
  await this.homePage.open();
  await this.homePage.clickNewArticle();

  await this.editorPage.createArticle(
    article.title,
    article.description,
    article.body,
    article.tagList
  );

  await this.articlePage.articleTitle.waitFor({
    state: 'visible',
  });

  await this.articlePage.openAuthorProfile();

  await this.feedPage
    .articleTitleByText(article.title)
    .waitFor({
      state: 'visible',
    });

  await this.feedPage.favoriteArticleByTitle(
    article.title
  );
}
}