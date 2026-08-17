import {
  expect,
  test as base,
} from '@playwright/test';

import {
  LoginPage,
  MainPage,
} from '../pages/index.js';

import { App } from '../app.js';

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

  app: async ({ authenticatedPage }, use) => {
  const app = new App(authenticatedPage);

  await use(app);
},

});

export { expect };