import {
  ArticleFacade,
  ProfileFacade,
} from './facades/index.js';

import {
  ArticlePage,
  FeedPage,
  ProfilePage,
} from './pages/index.js';

export class App {
  constructor(page) {
    this.page = page;

    this.article = new ArticleFacade(page);
    this.profile = new ProfileFacade(page);

    this.articlePage = new ArticlePage(page);
    this.feedPage = new FeedPage(page);
    this.profilePage = new ProfilePage(page);
  }
}