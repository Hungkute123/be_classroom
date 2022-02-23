import { CommentModel } from "../models/comment.Model/comment.Model";

class CommentServices {
  getCommentByPostID = async (PostID: string) => {
    try {
      const Comment = await CommentModel.find({
        PostID: PostID,
      });
      if (Comment.length === 0) {
        return {
          data: null,
          message: "can not find comment",
          status: 400,
        };
      }
      return {
        data: Comment,
        message: "Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  saveComment = async (
    CodeClass: string,
    MarkType: string,
    Mark: number
  ) => {
    try {
      const createComment = new CommentModel({
        CodeClass: CodeClass,
        MarkType: MarkType,
        Mark: Mark,
        Complete: false,
      });
      const saveComment = await createComment.save();
      return {
        data: saveComment,
        message: "Create Class Structure Success",
        status: 200,
      };
    } catch (error: any) {
      throw new Error(error.messages);
    }
  };
  
}
export const commentServices = new CommentServices();
