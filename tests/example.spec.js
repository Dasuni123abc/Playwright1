// @ts-check
const { test, expect } = require('@playwright/test');

// ✅ Run ONLY on WebKit
test.use({ browserName: 'webkit' });

const url = 'https://www.swifttranslator.com/';
const inputBox = 'textarea';
const outputBox =
  'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto';

// ====================================================
// POSITIVE FUNCTIONAL TEST CASES
// ====================================================
test.describe('POSITIVE FUNCTIONAL TESTS', () => {

  test('POS - Simple sentence translation', async ({ page }) => {
    await page.goto(url);
    await page.locator(inputBox).fill('mama gedhara yanavaa');

    await expect(page.locator(outputBox))
    .toHaveText(/.+/, { timeout: 20000 });
  });

  const positiveSentences = [
    'mama gedhara yanavaa',
    'mata bath oonee',
    'api paasal yanavaa',
    'api kaeema kanna yanavaa saha passe chithrapatiyakuth balanavaa',
    'hebæyi vahina nisaa dhaenma yannee naehae',
    'oyaa hari, ehenam api yamuu',
    'oyaa enavaanam mama balan innavaa',
    'vaessa unath api yanna epaeyi',
    'mama parakku vunee maarga thadhabadhaya nisaa',
    'oyaata kohomadha?',
    'issarahata yanna',
    'eeka dhenna',
    'mama ehema karanavaa',
    'mama ehema karannee naehae',
    'aayuboovan!',
    'mata udhavvak karanna puluvandha?',
    'ehema karapan',
    'mata nidhimathayi',
    'kaeema kanna yamu',
    'hari hari lassanayi',
    'mama iiyee gedhara giyaa',
    'Zoom meeting ekak thiyennee',
    'api trip eka Kandy valata yamudha?',
    'meeka hariyata vaeda karanavaadha?'
  ];

  for (const sentence of positiveSentences) {
    test(`POS - Valid input: "${sentence}"`, async ({ page }) => {
      await page.goto(url);
      await page.locator(inputBox).fill(sentence);

      await expect(page.locator(outputBox))
        .toBeVisible();
    });
  }
});

// ====================================================
// NEGATIVE FUNCTIONAL TEST CASES (UPDATED)
// ====================================================
test.describe('NEGATIVE FUNCTIONAL TESTS', () => {

  const negativeSentences = [
    'mamanuvarayanavaa',          // 1
    'matavathuraoonee',           // 2
    '   ',                        // 3 - empty spaces
    'mama @@@ gedhara yanavaa',   // 4
    'https://example.com',        // 5
    'test123@gmail.com',          // 6
    'Please translate this',      // 7
    'mama rata yanawa'            // 8
  ];

  for (const sentence of negativeSentences) {
    test(`NEG - Invalid input: "${sentence}"`, async ({ page }) => {
      await page.goto(url);
      await page.locator(inputBox).fill(sentence);

      await expect(page.locator(outputBox))
        .toHaveText('', { timeout: 15000 });
    });
  }
});

// ====================================================
// UI TEST CASES (UPDATED INPUT)
// ====================================================
test.describe('UI TESTS', () => {

  test('UI - Textarea accepts typing', async ({ page }) => {
    await page.goto(url);

    // 9. UI test case sentence
    await page.locator(inputBox).type('mama labana avurudhdhe rata yanavaa');

    await expect(page.locator(inputBox))
      .toHaveValue(/mama labana avurudhdhe rata yanavaa/);
  });

});
