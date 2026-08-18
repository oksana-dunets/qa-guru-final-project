import {
  expect,
  test as base,
} from '@playwright/test';

import {
  MainPage,
  RegistrationPage,
} from '../pages/index.js';

import { UserBuilder } from '../builders/index.js';

import { App } from '../app.js';

export const test = base.extend({
  uiUser: async ({}, use) => {
    const user = new UserBuilder().build();

    await use(user);
  },

  authenticatedPage: async ({
    page,
    uiUser,
  }, use) => {
    const mainPage = new MainPage(page);
    const registrationPage =
      new RegistrationPage(page);

    await mainPage.open();
    await mainPage.openRegistrationPage();

    await registrationPage.register(uiUser);

    await use(page);
  },

  app: async ({
    authenticatedPage,
  }, use) => {
    const app = new App(authenticatedPage);

    await use(app);
  },
});

export { expect };