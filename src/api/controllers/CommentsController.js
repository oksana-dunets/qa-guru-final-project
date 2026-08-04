export class CommentsController {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async createComment(slug, comment) {
    return this.apiContext.post(
      `articles/${encodeURIComponent(slug)}/comments`,
      {
        data: {
          comment: {
            body: comment.body,
          },
        },
      }
    );
  }

  async getComments(slug) {
    return this.apiContext.get(
      `articles/${encodeURIComponent(slug)}/comments`
    );
  }

  async deleteComment(slug, commentId) {
    return this.apiContext.delete(
      `articles/${encodeURIComponent(slug)}/comments/${commentId}`
    );
  }
}