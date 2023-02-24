const puppeteer = require('puppeteer');
const languages = require('./languages.json');

class Deluooder {
  constructor() {
    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto('https://translate.google.fr/');

      // Set screen size
      await page.setViewport({width: 1920, height: 1080});

      await page.mouse.click(1057, 843);
      await page.waitForNavigation({waitUntil: 'networkidle0'});
      await page.type('.er8xn', 'Totobono il est trop beau');

      // Déroule les langues
      await page.mouse.click(1293, 156);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      await page.keyboard.type('Anglais');
      await page.keyboard.press('Enter');

      //let selectorLanguage = 'div[data-language-code="en"]';

      //await page.waitForSelector(selectorLanguage);
      //let slBox = await (await page.$(selectorLanguage)).boundingBox();
      //await page.mouse.click(slBox.x, slBox.y);

      //console.log(slBox);

      await page.waitForSelector('.ryNqvb', {delay: 5000});
      let element = await page.$('.ryNqvb');
      let value = await page.evaluate(el => el.textContent, element);
      console.log(value);

    
    })();
  }

  setLanguageFrom(language) {
  }

  setLanguageTo(language) {
  }

  setSentence(text) {
  }

  getTranslation() {
    return ""
  }

  hello_deluoode() {
    console.log("hello deluoode");
  }
}

function main() {
  const deluooder = new Deluooder();
  deluooder.hello_deluoode();
}

if (require.main === module) {
    main();
}

module.exports = Deluooder
