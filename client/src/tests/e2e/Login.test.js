import Page from './helpers/page';

let page;
jest.setTimeout(30000);

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('After logging in you are taken to the apps page', async () => {
  await page.login();
  await page.waitForSelector('.apps-page');
});
