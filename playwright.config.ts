import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  /** Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /** Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: null,

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'results/'
};

export default config;
