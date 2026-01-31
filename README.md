node -v
npm -v

playwright installation :
mkdir playwright -project 
cd playwright -project

npm init -y
npm init playwright@latest
npm playwright test
npx playwright test --ui
npx playwright test --project=webkit

playwright.config.js

import { defineConfig } from '@playwright/test';

export default defineConfig({
projects : [
   {
      name: 'webkit',
      use: { browserName: 'webkit' },
   },
  ],
});
create  a file inside tests folder 
tests/example.spec.js

import { test, expect } from '@playwright/test';

test('simple test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
 npx playwright test
