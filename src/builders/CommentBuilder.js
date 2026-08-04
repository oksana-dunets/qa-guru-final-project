import { faker } from '@faker-js/faker';

export class CommentBuilder {
  constructor() {
    this.comment = {
      body: faker.lorem.sentence(),
    };
  }

  withBody(body) {
    this.comment.body = body;
    return this;
  }

  build() {
    return { ...this.comment };
  }
}