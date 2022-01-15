import { Schema, model } from 'mongoose';

interface Class {
    IDUser: string,
    CodeClass: string,
    Title: string,
    Theme?: string,
    Part?: string,
    Image: string,
    Room?: string,
    Status?: boolean
}
const ClassSchema =  new Schema<Class>({
    IDUser: {type: String, require: true},
    CodeClass: {type: String, require: true},
    Title: {type: String, require: true},
    Theme: String,
    Part: String,
    Image: {type: String, require: true},
    Room: String,
    Status: Boolean,
});

export const ClassModel = model<Class>('class', ClassSchema);
