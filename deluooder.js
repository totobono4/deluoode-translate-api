const puppeteer = require('puppeteer');

class Deluooder {
  constructor() {
    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
    
      await page.goto('https://translate.google.fr/');
    
      // Set screen size
      await page.setViewport({width: 1920, height: 1080});
    
      await page.mouse.click(1057, 843, { delay: 2000 });
    
      await page.waitForNavigation({waitUntil: 'networkidle0'});
    
      await page.screenshot({path: 'google-trad.png'});
    
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
