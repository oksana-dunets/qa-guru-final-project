import {
  apiExpect as expect,
  apiTest as test,
} from '../../src/fixtures/index.js';

import { ArticleBuilder } from '../../src/builders/index.js';

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

