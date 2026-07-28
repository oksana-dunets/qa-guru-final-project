import {
  expect,
  test as base,
} from '@playwright/test';

import {
  ArticleFacade,
  ProfileFacade,
} from '../facades/index.js';

import {
  ArticlePage,
  FeedPage,
  LoginPage,
  MainPage,
  ProfilePage,
} from '../pages/index.js';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.open();
    await mainPage.openLoginPage();
    await loginPage.login(email, password);

    await use(page);
  },

  articleFacade: async ({ authenticatedPage }, use) => {
    const articleFacade =
      new ArticleFacade(authenticatedPage);

    await use(articleFacade);
  },

  profileFacade: async ({ authenticatedPage }, use) => {
    const profileFacade =
      new ProfileFacade(authenticatedPage);

    await use(profileFacade);
  },

  articlePage: async ({ authenticatedPage }, use) => {
    const articlePage =
      new ArticlePage(authenticatedPage);

    await use(articlePage);
  },

  feedPage: async ({ authenticatedPage }, use) => {
    const feedPage =
      new FeedPage(authenticatedPage);

    await use(feedPage);
  },

  profilePage: async ({ authenticatedPage }, use) => {
    const profilePage =
      new ProfilePage(authenticatedPage);

    await use(profilePage);
  },
});

export { expect };