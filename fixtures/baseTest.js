import { test as base } from '@playwright/test';

export const test = base;

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(`Test Failed: ${testInfo.title}`);

    await page.screenshot({
      path: `reports/${testInfo.title}-failed.png`,
      fullPage: true
    });
  }
});