import { Schema, model } from 'mongoose';

interface Comment {
    parentComment?: string,
    content: string,
    createTime: string,
    updateTime?: string,
    authorID: string,
    postID: string,
    status: boolean
}
const CommentSchema = new Schema<Comment>({
    parentComment: String,
    content: { type: String, require: true },
    createTime: { type: String, require: true },
    updateTime: String,
    authorID: { type: String, require: true },
    postID: { type: String, require: true },
    status: { type: Boolean, require: true }

});

export const CommentModel = model<Comment>('comment', CommentSchema);
