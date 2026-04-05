// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },
  ],
});

module.exports = config;

