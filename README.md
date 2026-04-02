# Propsoch Playwright Test Suite

This repository contains a Playwright-based automation suite for the Propsoch fair price calculator website.

## Summary

- Test framework: `@playwright/test`
- Language: JavaScript (CommonJS)
- Test directory: `tests/`
- Page object models: `pom/`
- Test data: `testdata/`
- Output artifacts: `reports/` and `playwright-report/`

## Prerequisites

- Node.js installed
- npm available
- Internet access to load `https://www.propsoch.com/fair-price-calculator`

## Install

From the repository root:

```bash
npm install
```

## Run tests

Run the full Playwright suite:

```bash
npx playwright test
```

Run a specific browser project:

```bash
npx playwright test --project=chromium
```

Run with headed mode for debugging:

```bash
npx playwright test --headed --project=chromium
```

## Playwright configuration

The test runner is configured in `playwright.config.js`.

- `testDir`: `./tests`
- `fullyParallel`: enabled
- `reporter`: `html`
- browser projects: `chromium`, `firefox`, and `webkit`
- `trace`: collected on first retry

## Key files

- `tests/search_and_navigate.spec.js`
  - Search and navigate tests for the Propsoch fair price app
  - Includes a positive project search, score/comparable verification, and a no-result flow
- `pom/fairPriceHome.page.js`
  - Home page object for navigation, project search, and selecting a suggestion
- `pom/fairPriceProject.page.js`
  - Project page object for verifying loaded project details, score, and comparables
- `testdata/project.js`
  - Test data values used in the suite, such as `project.name` and `project.absent_name`
- `fixtures/baseTest.js`
  - Custom Playwright fixture that adds `afterEach` error handling
  - Captures failure screenshots to `reports/` when a test fails

## Reports and artifacts

- `reports/fair-price-result.png`
- `reports/comparable-result.png`
- `playwright-report/` contains generated HTML Playwright reports after a test run

## Notes

- There are no npm scripts defined in `package.json`; use `npx playwright test` directly.
- If you need to add new tests, place them in `tests/` and use page objects from `pom/`.
- Update test data in `testdata/project.js` for new project names or search scenarios.
