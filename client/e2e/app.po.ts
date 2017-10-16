import { browser, by, element } from 'protractor';

export class AipWeek4PrepPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
