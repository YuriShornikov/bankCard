import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('check valid form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true
    });
    page = await browser.newPage();
  });

  test('should validate form input', async () => {
    await page.goto(baseUrl);
    await page.type('#innogrn-input', '371449635398431');
    await page.click('.submit');
    await page.waitForSelector('.input.valid');
    const result = await page.evaluate(() => {
      const inp = document.querySelector('.input');
      return inp.classList.contains('valid');
    });

    expect(result).toBe(true);
  });

  test('should not validate form input', async () => {
    await page.goto(baseUrl);
    await page.type('#innogrn-input', '1234567890');
    await page.click('.submit');
    const inputValue = await page.evaluate(() => {
      const input = document.querySelector('#innogrn-input');
      return input.value;
    });

    expect(inputValue).toBe('');
  });

  afterAll(async () => {
    await browser.close();
  });
});
