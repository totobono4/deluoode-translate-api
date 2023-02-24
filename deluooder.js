const puppeteer = require('puppeteer');
const { selectors, languages } = require('./deluoode.json');

class Deluooder {

  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init()  {

    this.browser = await puppeteer.launch({headless: false, slowMo: 50});
    this.page = await this.browser.newPage();
    
    await this.page.goto('https://translate.google.fr/');

    // Set screen size
    await this.page.setViewport({width: 1080, height: 1024});

    // Accepter CGU :
    await this.page.click(selectors.accept);
    await this.page.waitForNavigation({waitUntil: 'networkidle0'});

    await this.setLanguageFrom(languages.fr);
    await this.setSentence('Coucou cest moi');
    await this.setLanguageTo(languages['zh-tw']);
    await this.getTranslation().then((res) => {
      console.log(res);
    });

  };
  
  async setLanguageFrom(language) {
    await this.page.click(selectors.sourceLang);
    await this.page.waitForSelector(selectors.searchLang);
    await this.page.keyboard.type(language);
    await this.page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async setLanguageTo(language) {
    await this.page.click(selectors.targetLang);
    await this.page.waitForSelector(selectors.searchLang);
    await this.page.keyboard.type(language);
    await this.page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));
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

  hello_deluoode() {
    console.log("hello deluoode");
  }
}


async function main() {
  const deluooder = new Deluooder();
  await deluooder.init();
}

if (require.main === module) {
    main();
}

module.exports = Deluooder
