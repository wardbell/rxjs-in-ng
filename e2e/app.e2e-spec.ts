import { UnsubscriberPage } from './app.po';

describe('unsubscriber App', () => {
  let page: UnsubscriberPage;

  beforeEach(() => {
    page = new UnsubscriberPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
