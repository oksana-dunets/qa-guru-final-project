import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {
  ArticlePage,
  EditorPage,
  FeedPage,
  HomePage,
  LoginPage,
  MainPage,
  ProfilePage,
} from '../src/pages/index.js';

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
  const article = new ArticlePage(page);
  const editor = new EditorPage(page);

  const title = `Article ${Date.now()}`;

  await home.clickNewArticle();

  await editor.createArticle(
    title,
    'Created by autotest',
    'Test article body'
  );

  await expect(article.articleTitle).toHaveText(title);
});

test('Edit Article', async ({ page }) => {
  const home = new HomePage(page);
  const article = new ArticlePage(page);
  const editor = new EditorPage(page);

  const title = `Article ${Date.now()}`;
  const updatedTitle = `Updated ${Date.now()}`;

  await home.open();

  await home.clickNewArticle();

  await editor.createArticle(
    title,
    'Created by autotest',
    'Test article body'
  );

  await article.openEditArticle();

  await editor.updateArticleTitle(updatedTitle);

  await expect(article.articleTitle).toHaveText(updatedTitle);
});

test('Delete Article', async ({ page }) => {
  const home = new HomePage(page);
  const feed = new FeedPage(page);
  const article = new ArticlePage(page);
  const editor = new EditorPage(page);

  const title = `Article ${faker.string.uuid()}`;

  await home.open();

  await home.clickNewArticle();

  await editor.createArticle(
    title,
    'Created by autotest',
    'Test article body'
  );

  await article.deleteArticle();

  await feed.openGlobalFeed();

  await expect(feed.articleTitleByText(title)).toHaveCount(0);
});

test('Favorite Article', async ({ page }) => {
  const home = new HomePage(page);
  const feed = new FeedPage(page);
  const article = new ArticlePage(page);
  const editor = new EditorPage(page);

  const title = `Article ${Date.now()}`;

  await home.open();

  await home.clickNewArticle();

  await editor.createArticle(
    title,
    'Created by autotest',
    'Test article body'
  );

  await expect(article.articleTitle).toHaveText(title);

  await home.open();

  await feed.openGlobalFeed();

  await expect(feed.firstArticleTitle).toHaveText(title);

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