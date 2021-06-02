import { Builder, ThenableWebDriver, Capabilities } from 'selenium-webdriver';
import { encode } from 'utf8';
const fs = require('fs');

export default class SeleniumServiceTests {
    protected static driver: ThenableWebDriver;

    protected static openPage(path: string): void {
        const scriptString = fs.readFileSync(`tests/html/btk-inline.js`).toString();
        const html = fs.readFileSync(path).toString().replace('${scriptString}', scriptString);

        const capabilities = Capabilities.chrome();

        capabilities.set('goog:chromeOptions', {
            args: ['--headless', '--no-sandbox', 'window-size=1024,768', '--disable-gpu'],
        });
        this.driver = new Builder().forBrowser('chrome').withCapabilities(capabilities).build();

        const html_bs64 = Buffer.from(encode(html)).toString('base64');
        this.driver.get('data:text/html;base64,' + html_bs64);
    }

    public static async after() {
        await this.driver.quit();
    }
}
