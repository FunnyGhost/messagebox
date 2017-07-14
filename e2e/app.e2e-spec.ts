import { MessageBoxPage } from './app.po';

describe('message-box App', () => {
  let page: MessageBoxPage;

  beforeEach(() => {
    page = new MessageBoxPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
