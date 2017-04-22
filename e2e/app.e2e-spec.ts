import { OpenquizPage } from './app.po';

describe('openquiz App', () => {
  let page: OpenquizPage;

  beforeEach(() => {
    page = new OpenquizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
