import { test, expect } from '@playwright/test';

import {
  ArticlePage,
  EditorPage,
  FeedPage,
  HomePage,
  LoginPage,
  MainPage,
  ProfilePage,
} from '../src/pages/index.js';

import { ArticleBuilder } from '../src/builders/index.js';

const email = process.env.TEST_USER_EMAIL;
const currentPassword = process.env.TEST_USER_PASSWORD;

test.beforeEach(async ({ page }) => {
  const main = new MainPage(page);
  const login = new LoginPage(page);

  await main.open();

  await main.openLoginPage();

  await login.login(email, currentPassword);
});

test('Create Article', async ({ page }) => {
  const home = new HomePage(page);
  const articlePage = new ArticlePage(page);
  const editor = new EditorPage(page);

  const article = new ArticleBuilder().build();

  await home.clickNewArticle();

  await editor.createArticle(
    article.title,
    article.description,
    article.body
  );

  await expect(articlePage.articleTitle).toHaveText(article.title);
});

test('Edit Article', async ({ page }) => {
  const home = new HomePage(page);
  const articlePage = new ArticlePage(page);
  const editor = new EditorPage(page);

  const article = new ArticleBuilder().build();
  const updatedArticle = new ArticleBuilder().build();

  await home.open();
  await home.clickNewArticle();

  await editor.createArticle(
    article.title,
    article.description,
    article.body
  );

  await articlePage.openEditArticle();

  await editor.updateArticleTitle(updatedArticle.title);

  await expect(articlePage.articleTitle).toHaveText(
    updatedArticle.title
  );
});

test('Delete Article', async ({ page }) => {
  const home = new HomePage(page);
  const feed = new FeedPage(page);
  const articlePage = new ArticlePage(page);
  const editor = new EditorPage(page);

  const article = new ArticleBuilder().build();

  await home.open();
  await home.clickNewArticle();

  await editor.createArticle(
    article.title,
    article.description,
    article.body
  );

  await articlePage.deleteArticle();

  await feed.openGlobalFeed();

  await expect(
    feed.articleTitleByText(article.title)
  ).toHaveCount(0);
});

test('Favorite Article', async ({ page }) => {
  const home = new HomePage(page);
  const feed = new FeedPage(page);
  const articlePage = new ArticlePage(page);
  const editor = new EditorPage(page);

  const article = new ArticleBuilder().build();

  await home.open();
  await home.clickNewArticle();

  await editor.createArticle(
    article.title,
    article.description,
    article.body
  );

  await expect(articlePage.articleTitle).toHaveText(article.title);

  await home.open();
  await feed.openGlobalFeed();

  await expect(feed.firstArticleTitle).toHaveText(article.title);

  await feed.favoriteFirstArticle();

  await expect(feed.firstArticleFavoriteButton).toContainText('1');
});

test('Update Profile', async ({ page, browser }) => {
  const home = new HomePage(page);
  const profile = new ProfilePage(page);

  const bio = `This account was updated by an automated test ${new Date().toLocaleString()}`;

  await home.open();

  await home.openSettings();

  await profile.updateBio(bio, currentPassword);

  await profile.openSettings();

  await expect(profile.bioInput).toHaveValue(bio);

  const newContext = await browser.newContext();
  const newPage = await newContext.newPage();

  const mainInNewSession = new MainPage(newPage);
  const loginInNewSession = new LoginPage(newPage);
  const homeInNewSession = new HomePage(newPage);

  await mainInNewSession.open();

  await mainInNewSession.openLoginPage();

  await loginInNewSession.login(email, currentPassword);

  await expect(homeInNewSession.newArticleButton).toBeVisible();

  await newContext.close();
});