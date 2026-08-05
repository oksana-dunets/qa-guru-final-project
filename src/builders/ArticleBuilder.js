import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  constructor() {
    const uniqueTag = faker.string
      .alphanumeric(10)
      .toLowerCase();

    this.article = {
      title: `Article ${faker.string.uuid()}`,
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      tagList: [`tag-${uniqueTag}`],
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

  withTagList(tagList) {
    this.article.tagList = tagList;
    return this;
  }

  build() {
    return { ...this.article };
  }
}