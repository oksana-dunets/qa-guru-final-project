import {
  apiExpect as expect,
  apiTest as test,
} from '../../src/fixtures/index.js';

import {
  ArticleBuilder,
  CommentBuilder,
} from '../../src/builders/index.js';

// № 1 Создание и получение статьи
test('Create and get article via API', async ({
  articleApiFacade,
  apiSession,
}) => {
  const article = new ArticleBuilder().build();

  const result =
    await articleApiFacade.createAndGetArticle(article);

  expect(result.createStatus).toBe(201);

  expect(result.createBody.article).toMatchObject({
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList ?? [],
  });

  expect(result.getStatus).toBe(200);

  expect(result.getBody.article).toMatchObject({
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList ?? [],
  });

  expect(result.getBody.article.slug).toBe(
    result.createBody.article.slug
  );

  expect(result.getBody.article.author.username).toBe(
    apiSession.user.username
  );

  expect(result.cleanupStatus).toBe(204);
});

// № 2 Редактирование созданной статьи
test('Update article via API', async ({
  articleApiFacade,
  apiSession,
}) => {
  const article = new ArticleBuilder().build();
  const updatedArticle = new ArticleBuilder().build();

  const result =
    await articleApiFacade.updateAndGetArticle(
      article,
      updatedArticle
    );

  expect(result.createStatus).toBe(201);
  expect(result.updateStatus).toBe(200);

  expect(result.updateBody.article).toMatchObject({
    title: updatedArticle.title,
    description: updatedArticle.description,
    body: updatedArticle.body,
  });

  expect(result.getStatus).toBe(200);

  expect(result.getBody.article).toMatchObject({
    title: updatedArticle.title,
    description: updatedArticle.description,
    body: updatedArticle.body,
  });

  expect(result.getBody.article.slug).toBe(
    result.updateBody.article.slug
  );

  expect(result.getBody.article.author.username).toBe(
    apiSession.user.username
  );

  expect(result.cleanupStatus).toBe(204);
});

// № 3 Добавление статьи в избранное и удаление из избранного
test('Favorite and unfavorite article via API', async ({
  articleApiFacade,
}) => {
  const article = new ArticleBuilder().build();

  const result =
    await articleApiFacade.favoriteAndUnfavoriteArticle(
      article
    );

  expect(result.createStatus).toBe(201);

  expect(result.favoriteStatus).toBe(200);

  expect(result.favoriteBody.article).toMatchObject({
    title: article.title,
    favorited: true,
    favoritesCount: 1,
  });

  expect(result.unfavoriteStatus).toBe(200);

  expect(result.unfavoriteBody.article).toMatchObject({
    title: article.title,
    favorited: false,
    favoritesCount: 0,
  });

  expect(result.cleanupStatus).toBe(204);
});

// № 4 Создание и удаление комментария к статье
test('Create and delete comment via API', async ({
  commentApiFacade,
  apiSession,
}) => {
  const article = new ArticleBuilder().build();
  const comment = new CommentBuilder().build();

  const result =
    await commentApiFacade.createGetAndDeleteComment(
      article,
      comment
    );

  expect(result.createArticleStatus).toBe(201);

  expect(result.createCommentStatus).toBe(201);

  expect(result.createCommentBody.comment).toMatchObject({
    body: comment.body,
  });

  expect(
    result.createCommentBody.comment.author.username
  ).toBe(apiSession.user.username);

  const commentId =
    result.createCommentBody.comment.id;

  expect(result.getCommentsStatus).toBe(200);

  expect(
    result.getCommentsBody.comments
  ).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: commentId,
        body: comment.body,
      }),
    ])
  );

  expect(result.deleteCommentStatus).toBe(204);

  expect(
    result.getCommentsAfterDeleteStatus
  ).toBe(200);

  const deletedComment =
    result.getCommentsAfterDeleteBody.comments.find(
      savedComment => savedComment.id === commentId
    );

  expect(deletedComment).toBeUndefined();

  expect(result.cleanupStatus).toBe(204);
});

// № 5 Фильтрация статей по тегу
test('Filter articles by tag via API', async ({
  articleApiFacade,
}) => {
  const article = new ArticleBuilder().build();
  const tag = article.tagList[0];

  const result =
    await articleApiFacade.createAndFilterArticleByTag(
      article
    );

  expect(result.createStatus).toBe(201);
  expect(result.filterStatus).toBe(200);

  expect(
    result.filterBody.articlesCount
  ).toBeGreaterThan(0);

  const filteredArticle =
    result.filterBody.articles.find(
      savedArticle =>
        savedArticle.slug ===
        result.createBody.article.slug
    );

  expect(filteredArticle).toBeDefined();

  expect(filteredArticle).toMatchObject({
    slug: result.createBody.article.slug,
    title: article.title,
    description: article.description,
  });

  expect(filteredArticle.tagList).toContain(tag);

  expect(result.cleanupStatus).toBe(204);
});

