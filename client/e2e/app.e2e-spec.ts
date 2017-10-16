import { AipWeek4PrepPage } from './app.po';

describe('aip-week4-prep App', () => {
  let page: AipWeek4PrepPage;

  beforeEach(() => {
    page = new AipWeek4PrepPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
