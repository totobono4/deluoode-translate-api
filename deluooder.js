const puppeteer = require('puppeteer');
const { selectors, languages } = require('./deluoode.json');

class Deluooder {
  constructor() {

    this.browser = null;
    this.page = null;

    (async () => {

      //await page.goto('https://translate.google.fr/');

      // Set screen size
      //await page.setViewport({width: 1920, height: 1080});

      // Accepter CGU :
      //await page.click(selectors.accept);
      //await page.waitForNavigation({waitUntil: 'networkidle0'});

    })();
  }

  async setLanguageFrom(language) {
    await this.page.click(selectors.sourceLang);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.page.keyboard.type(language);
    await this.page.keyboard.press('Enter');
  }

  async setLanguageTo(language) {
    await this.page.click(selectors.targetLang);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.page.keyboard.type(language);
    await this.page.keyboard.press('Enter');
  }

  async setSentence(text) {
    await this.page.type(selectors.input, text);
  }

  async getTranslation() {
    await this.page.waitForSelector(selectors.output);
    let element = await this.page.$(selectors.output);
    let value = await this.page.evaluate(el => el.textContent, element);
    return value;
  }

  async init() {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await browser.newPage();
  }

  hello_deluoode() {
    console.log("hello deluoode");
  }
}

async function main() {
  const deluooder = new Deluooder();
  await deluooder.init();
  deluooder.hello_deluoode();
  deluooder.setLanguageFrom(languages.fr);
  deluooder.setSentence('Salut je suis un cascadeur professionnel');
  deluooder.setLanguageTo(languages.en);
  console.log(deluooder.getTranslation());
}

if (require.main === module) {
    main();
}

module.exports = Deluooder
