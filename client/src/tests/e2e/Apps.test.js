import Page from './helpers/page';
import { apps } from './mocks/apps.json';

let page;
jest.setTimeout(20000);

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When logged in', () => {
  beforeEach(async () => {
    await page.login();
  });

  test('Can see logout btn', async () => {
    await page.waitForFunction(
      text => document.querySelector('body').innerText.includes(text),
      {},
      'LOG OUT',
    );
  });

  test('Can see add new app btn', async () => {
    await page.waitForFunction(
      text => document.querySelector('body').innerText.includes(text),
      {},
      'ADD NEW APP',
    );
  });

  test('Can see apps', async () => {
    await page.waitForSelector('.app');
    const appName = await page.$eval('.app__name', el => el.innerHTML);
    expect(appName).toBe(apps[0].name);
  });
});