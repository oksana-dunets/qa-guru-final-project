import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  constructor() {
    this.article = {
      title: `Article ${faker.string.uuid()}`,
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };
  }

  withTitle(title) {
    this.article.title = title;
    return this;
  }

  withDescription(description) {
    this.article.description = description;
    return this;
  }

  withBody(body) {
    this.article.body = body;
    return this;
  }

  build() {
    return { ...this.article };
  }
}