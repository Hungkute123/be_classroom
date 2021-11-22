import { Schema, model } from 'mongoose';

interface Class {
    IDUser: number,
    CodeClass: string,
    Title: string,
    Theme?: string,
    Part?: string,
    Image: string,
    Room?: String,
}
const ClassSchema =  new Schema<Class>({
    IDUser: {type: Number, require: true},
    CodeClass: {type: String, require: true},
    Title: {type: String, require: true},
    Theme: String,
    Part: String,
    Image: {type: String, require: true},
    Room: String,
});

export const ClassModel = model<Class>('class', ClassSchema);
