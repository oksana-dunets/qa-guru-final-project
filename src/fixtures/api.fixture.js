import {
  expect,
  test as base,
} from '@playwright/test';

import { AuthController } from '../api/index.js';

import { UserBuilder } from '../builders/index.js';

import { Api } from '../api.js';

export const test = base.extend({
  publicApiContext: async ({ playwright }, use) => {
    const publicApiContext =
      await playwright.request.newContext({
        baseURL: process.env.API_BASE_URL,
      });

    await use(publicApiContext);

    await publicApiContext.dispose();
  },

  apiSession: async ({
    publicApiContext,
  }, use) => {
    const credentials = new UserBuilder().build();

    const authController =
      new AuthController(publicApiContext);

    const registrationResponse =
      await authController.register(credentials);

    const responseText =
      await registrationResponse.text();

    let responseBody;

    try {
      responseBody = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Registration returned non-JSON response. ` +
        `Status: ${registrationResponse.status()}. ` +
        `Body: ${responseText}`
      );
    }

    if (
      registrationResponse.status() !== 201 ||
      !responseBody.user?.token
    ) {
      throw new Error(
        `API user registration failed. ` +
        `Status: ${registrationResponse.status()}. ` +
        `Body: ${responseText}`
      );
    }

    await use({
      credentials,
      user: responseBody.user,
      token: responseBody.user.token,
    });
  },

    authorizedApiContext: async ({
    playwright,
    apiSession,
  }, use) => {
    const authorizedApiContext =
      await playwright.request.newContext({
        baseURL: process.env.API_BASE_URL,

        extraHTTPHeaders: {
          Authorization: `Token ${apiSession.token}`,
        },
      });

    await use(authorizedApiContext);

    await authorizedApiContext.dispose();
  },

  api: async ({
    authorizedApiContext,
  }, use) => {
    const api = new Api(authorizedApiContext);

    await use(api);
  },
});

export { expect };