import { Schema, model } from 'mongoose';

interface Post {
    title?: string,
    content: string,
    tags?: string,
    createTime: string,
    updateTime?: string,
    authorID: string,
    status: boolean
}
const PostSchema = new Schema<Post>({
    title: String,
    content: { type: String, require: true },
    tags: String,
    createTime: { type: String, require: true },
    updateTime: String,
    authorID: { type: String, require: true },
    status: { type: Boolean, require: true },
});

export const PostModel = model<Post>('post', PostSchema);
