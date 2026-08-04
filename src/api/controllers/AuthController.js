export class AuthController {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async register(user) {
    return this.apiContext.post('users', {
      data: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      },
    });
  }

  async login(user) {
    return this.apiContext.post('users/login', {
      data: {
        user: {
          email: user.email,
          password: user.password,
        },
      },
    });
  }
}