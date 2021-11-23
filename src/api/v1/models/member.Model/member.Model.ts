import { Schema, model } from 'mongoose';
interface Member {
    IDUser: string,
    CodeClass: string,
    Permission: string,
    Status: boolean,
}
const MemberSchema =  new Schema<Member>({
    IDUser: {type: String, require: true},
    CodeClass: {type: String, require: true},
    Permission:{type: String, require: true},
    Status:{type: Boolean, require: true}
});

export const MemberModel = model<Member>('member', MemberSchema);