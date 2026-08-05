export class ArticlesController {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async createArticle(article) {
    return this.apiContext.post('articles', {
      data: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList ?? [],
        },
      },
    });
  }

  async getArticle(slug) {
  return this.apiContext.get(
    `articles/${encodeURIComponent(slug)}`,
    {
      maxRetries: 2
    }
  );
}

  async updateArticle(slug, article) {
    return this.apiContext.put(
      `articles/${encodeURIComponent(slug)}`,
      {
        data: {
          article: {
            title: article.title,
            description: article.description,
            body: article.body,
          },
        },
      }
    );
  }

  async deleteArticle(slug) {
    return this.apiContext.delete(
      `articles/${encodeURIComponent(slug)}`
    );
  }

  async favoriteArticle(slug) {
    return this.apiContext.post(
      `articles/${encodeURIComponent(slug)}/favorite`
    );
  }

  async unfavoriteArticle(slug) {
    return this.apiContext.delete(
      `articles/${encodeURIComponent(slug)}/favorite`
    );
  }

  async getArticlesByTag(tag) {
  return this.apiContext.get('articles', {
    maxRetries: 2,

    params: {
      tag
    }
  });
}

}