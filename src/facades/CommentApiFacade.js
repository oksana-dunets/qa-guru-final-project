import {
  ArticlesController,
  CommentsController,
} from '../api/index.js';

export class CommentApiFacade {
  constructor(apiContext) {
    this.articlesController =
      new ArticlesController(apiContext);

    this.commentsController =
      new CommentsController(apiContext);
  }

  async createGetAndDeleteComment(article, comment) {
    const createArticleResponse =
      await this.articlesController.createArticle(article);

    const createArticleStatus =
      createArticleResponse.status();

    const createArticleBody =
      await this.#readResponseBody(
        createArticleResponse
      );

    const slug =
      createArticleBody?.article?.slug;

    let createCommentStatus = null;
    let createCommentBody = null;
    let getCommentsStatus = null;
    let getCommentsBody = null;
    let deleteCommentStatus = null;
    let getCommentsAfterDeleteStatus = null;
    let getCommentsAfterDeleteBody = null;
    let cleanupStatus = null;

    if (slug) {
      const createCommentResponse =
        await this.commentsController.createComment(
          slug,
          comment
        );

      createCommentStatus =
        createCommentResponse.status();

      createCommentBody =
        await this.#readResponseBody(
          createCommentResponse
        );

      const commentId =
        createCommentBody?.comment?.id;

      const getCommentsResponse =
        await this.commentsController.getComments(slug);

      getCommentsStatus =
        getCommentsResponse.status();

      getCommentsBody =
        await this.#readResponseBody(
          getCommentsResponse
        );

      if (commentId) {
        const deleteCommentResponse =
          await this.commentsController.deleteComment(
            slug,
            commentId
          );

        deleteCommentStatus =
          deleteCommentResponse.status();

        const getCommentsAfterDeleteResponse =
          await this.commentsController.getComments(slug);

        getCommentsAfterDeleteStatus =
          getCommentsAfterDeleteResponse.status();

        getCommentsAfterDeleteBody =
          await this.#readResponseBody(
            getCommentsAfterDeleteResponse
          );
      }

      const deleteArticleResponse =
        await this.articlesController.deleteArticle(slug);

      cleanupStatus =
        deleteArticleResponse.status();
    }

    return {
      createArticleStatus,
      createArticleBody,
      createCommentStatus,
      createCommentBody,
      getCommentsStatus,
      getCommentsBody,
      deleteCommentStatus,
      getCommentsAfterDeleteStatus,
      getCommentsAfterDeleteBody,
      cleanupStatus,
    };
  }

  async #readResponseBody(response) {
    const responseText = await response.text();

    if (!responseText) {
      return null;
    }

    try {
      return JSON.parse(responseText);
    } catch {
      return responseText;
    }
  }
}