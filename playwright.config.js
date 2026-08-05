import 'dotenv/config';
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [
    ['html'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
      },
    ],
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
  name: 'api',

  testMatch: 'api/**/*.spec.js',

  retries: 2,

  use: {
    baseURL: process.env.API_BASE_URL,
  },
},

    {
      name: 'chromium',

      testMatch: 'ui/**/*.spec.js',

      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL,
      },
    },

    {
      name: 'firefox',

      testMatch: 'ui/**/*.spec.js',

      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.UI_BASE_URL,
      },
    },

    {
      name: 'webkit',

      testMatch: 'ui/**/*.spec.js',

      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.UI_BASE_URL,
      },
    },
  ],
});