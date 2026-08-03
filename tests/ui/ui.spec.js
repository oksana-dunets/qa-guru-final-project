import {
  expect,
  test,
} from '../../src/fixtures/index.js';

import {
  HomePage,
  LoginPage,
  MainPage,
} from '../../src/pages/index.js';

import { ArticleBuilder } from '../../src/builders/index.js';

const email = process.env.TEST_USER_EMAIL;
const currentPassword = process.env.TEST_USER_PASSWORD;

// № 1 Создание новой статьи
test('Create Article', async ({
  articleFacade,
  articlePage,
}) => {
  const article = new ArticleBuilder().build();

  await articleFacade.createArticle(article);

  await expect(articlePage.articleTitle).toHaveText(article.title);
});

// № 2 Редактирование заголовка созданной статьи
test('Edit Article', async ({
  articleFacade,
  articlePage,
}) => {
  const article = new ArticleBuilder().build();
  const updatedArticle = new ArticleBuilder().build();

  await articleFacade.editArticle(
    article,
    updatedArticle
  );

  await expect(articlePage.articleTitle).toHaveText(
    updatedArticle.title
  );
});

// № 3 Удаление созданной статьи
test('Delete Article', async ({
  articleFacade,
  feedPage,
}) => {
  const article = new ArticleBuilder().build();

  await articleFacade.deleteArticle(article);

  await expect(
    feedPage.articleTitleByText(article.title)
  ).toHaveCount(0);
});

// № 4 Добавление созданной статьи в избранное
test('Favorite Article', async ({
  articleFacade,
  feedPage,
}) => {
  const article = new ArticleBuilder().build();

  await articleFacade.favoriteArticle(article);

  await expect(
    feedPage.articleTitleByText(article.title)
  ).toBeVisible();

  await expect(
    feedPage.articleFavoriteButtonByTitle(article.title)
  ).toContainText('1');
});

// № 5 Обновление информации в профиле пользователя
test('Update Profile', async ({
  profileFacade,
  profilePage,
  browser,
}) => {
  const bio =
    `This account was updated by an automated test ` +
    `${new Date().toLocaleString()}`;

  await profileFacade.updateProfile(
    bio,
    currentPassword
  );

  await expect(profilePage.bioInput).toHaveValue(bio);

  const newContext = await browser.newContext({
    baseURL: process.env.UI_BASE_URL,
  });

  try {
    const newPage = await newContext.newPage();

    const mainInNewSession = new MainPage(newPage);
    const loginInNewSession = new LoginPage(newPage);
    const homeInNewSession = new HomePage(newPage);

    await mainInNewSession.open();
    await mainInNewSession.openLoginPage();

    await loginInNewSession.login(
      email,
      currentPassword
    );

    await expect(
      homeInNewSession.newArticleButton
    ).toBeVisible();
  } finally {
    await newContext.close();
  }
});