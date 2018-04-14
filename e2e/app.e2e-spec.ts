import { demoPage } from './app.po';

describe('demo App', () => {
  let page: demoPage;

  beforeEach(() => {
    page = new demoPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
