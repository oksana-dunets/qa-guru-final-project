import { faker } from '@faker-js/faker';

export class UserBuilder {
  constructor() {
    const uniqueId = faker.string
      .alphanumeric(10)
      .toLowerCase();

    this.user = {
      username: `qa_${uniqueId}`,
      email: `qa_${uniqueId}@example.com`,
      password: `Test_${faker.string.alphanumeric(12)}1!`,
    };
  }

  withUsername(username) {
    this.user.username = username;
    return this;
  }

  withEmail(email) {
    this.user.email = email;
    return this;
  }

  withPassword(password) {
    this.user.password = password;
    return this;
  }

  build() {
    return { ...this.user };
  }
}