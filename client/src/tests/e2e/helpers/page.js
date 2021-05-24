import puppeteer from 'puppeteer';

import { apps } from '../mocks/apps.json';

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-web-security'] });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);
    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, apps, image: 'https://randomfox.ca/images/75.jpg' }),
      });
    });

    await this.page.type('#login-input', 'login');
    await this.page.type('#password-input', 'password');
    await this.page.click('.login-form__btn');
  }
}

module.exports = CustomPage;
