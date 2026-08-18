import {
  ArticleApiFacade,
  CommentApiFacade,
} from './facades/index.js';

export class Api {
  constructor(context) {
    this.article = new ArticleApiFacade(context);
    this.comment = new CommentApiFacade(context);
  }
}