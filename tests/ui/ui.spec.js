import {
  expect,
  test,
} from '../../src/fixtures/index.js';

import { ArticleBuilder } from '../../src/builders/index.js';

test.describe.configure({
  timeout: 60_000,
});

const currentPassword = process.env.TEST_USER_PASSWORD;

// № 1 Создание новой статьи
test('Create Article', async ({ app }) => {
  const article = new ArticleBuilder().build();

  await app.article.createArticle(article);

  await expect(app.articlePage.articleTitle)
    .toHaveText(article.title);

  await expect(app.articlePage.articleBody)
    .toContainText(article.body);

  await expect(app.articlePage.tagList)
    .toContainText(article.tagList[0]);

  await app.articlePage.deleteArticle();
});

// № 2 Редактирование заголовка созданной статьи
test('Edit Article', async ({ app }) => {
  const article = new ArticleBuilder().build();
  const updatedArticle = new ArticleBuilder().build();

  await app.article.editArticle(
    article,
    updatedArticle
  );

  await expect(app.articlePage.articleTitle).toHaveText(
    updatedArticle.title
  );

  await app.articlePage.deleteArticle();
});

// № 3 Удаление созданной статьи
test('Delete Article', async ({ app }) => {
  const article = new ArticleBuilder().build();

  await app.article.deleteArticle(article);

  await expect(
    app.feedPage.articleTitleByText(article.title)
  ).toHaveCount(0);
});

// № 4 Добавление созданной статьи в избранное
test('Favorite Article', async ({ app }) => {
  const article = new ArticleBuilder().build();

  await app.article.favoriteArticle(article);

  await expect(
    app.feedPage.articleTitleByText(article.title)
  ).toBeVisible();

  await expect(
    app.feedPage.articleFavoriteButtonByTitle(article.title)
  ).toContainText('1');

  await app.feedPage.openArticleByTitle(article.title);

  await app.articlePage.deleteArticle();

});

// № 5 Обновление информации в профиле пользователя
test('Update Profile', async ({ app }) => {
  const bio =
    `This account was updated by an automated test ` +
    `${new Date().toLocaleString()}`;

  await app.profile.updateProfile(
    bio,
    currentPassword
  );

  await expect(
    app.profilePage.bioInput
  ).toHaveValue(bio);

  await app.page.reload({
    waitUntil: 'domcontentloaded',
  });

  await expect(
    app.profilePage.bioInput
  ).toHaveValue(bio, {
    timeout: 15_000,
  });

});