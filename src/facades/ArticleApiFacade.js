import { ArticlesController } from '../api/index.js';

export class ArticleApiFacade {
  constructor(apiContext) {
    this.articlesController =
      new ArticlesController(apiContext);
  }

  async createAndGetArticle(article) {
    const createResponse =
      await this.articlesController.createArticle(article);

    const createStatus = createResponse.status();
    const createBody =
      await this.#readResponseBody(createResponse);

    const slug = createBody?.article?.slug;

    let getStatus = null;
    let getBody = null;
    let cleanupStatus = null;

    if (slug) {
      const getResponse =
        await this.articlesController.getArticle(slug);

      getStatus = getResponse.status();
      getBody =
        await this.#readResponseBody(getResponse);

      const deleteResponse =
        await this.articlesController.deleteArticle(slug);

      cleanupStatus = deleteResponse.status();
    }

    return {
      createStatus,
      createBody,
      getStatus,
      getBody,
      cleanupStatus,
    };
  }

  async updateAndGetArticle(article, updatedArticle) {
    const createResponse =
      await this.articlesController.createArticle(article);

    const createStatus = createResponse.status();
    const createBody =
      await this.#readResponseBody(createResponse);

    const originalSlug = createBody?.article?.slug;

    let updateStatus = null;
    let updateBody = null;
    let getStatus = null;
    let getBody = null;
    let cleanupStatus = null;

    if (originalSlug) {
      const updateResponse =
        await this.articlesController.updateArticle(
          originalSlug,
          updatedArticle
        );

      updateStatus = updateResponse.status();
      updateBody =
        await this.#readResponseBody(updateResponse);

      const updatedSlug =
        updateBody?.article?.slug ?? originalSlug;

      const getResponse =
        await this.articlesController.getArticle(
          updatedSlug
        );

      getStatus = getResponse.status();
      getBody =
        await this.#readResponseBody(getResponse);

      const deleteResponse =
        await this.articlesController.deleteArticle(
          updatedSlug
        );

      cleanupStatus = deleteResponse.status();
    }

    return {
      createStatus,
      createBody,
      updateStatus,
      updateBody,
      getStatus,
      getBody,
      cleanupStatus,
    };
  }

  async favoriteAndUnfavoriteArticle(article) {
  const createResponse =
    await this.articlesController.createArticle(article);

  const createStatus = createResponse.status();
  const createBody =
    await this.#readResponseBody(createResponse);

  const slug = createBody?.article?.slug;

  let favoriteStatus = null;
  let favoriteBody = null;
  let unfavoriteStatus = null;
  let unfavoriteBody = null;
  let cleanupStatus = null;

  if (slug) {
    const favoriteResponse =
      await this.articlesController.favoriteArticle(slug);

    favoriteStatus = favoriteResponse.status();
    favoriteBody =
      await this.#readResponseBody(favoriteResponse);

    const unfavoriteResponse =
      await this.articlesController.unfavoriteArticle(slug);

    unfavoriteStatus = unfavoriteResponse.status();
    unfavoriteBody =
      await this.#readResponseBody(unfavoriteResponse);

    const deleteResponse =
      await this.articlesController.deleteArticle(slug);

    cleanupStatus = deleteResponse.status();
  }

  return {
    createStatus,
    createBody,
    favoriteStatus,
    favoriteBody,
    unfavoriteStatus,
    unfavoriteBody,
    cleanupStatus,
  };
}


  async #readResponseBody(response) {
    const responseText = await response.text();

    if (!responseText) {
      return null;
    }

    try {
      return JSON.parse(responseText);
    } catch {
      return responseText;
    }
  }
}