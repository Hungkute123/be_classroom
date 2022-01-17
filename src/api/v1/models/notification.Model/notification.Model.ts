import { Schema, model } from 'mongoose';
interface Notification {
    NotificationType: string,
    CreateDate: string,
    Read: boolean,
    RecipientID: string,
    SenderID: string,
    Message: string,
    ClassName: string,
    Url: string,
}
const NotificationSchema =  new Schema<Notification>({
    NotificationType: {type: String, require: true},
    CreateDate: {type: String, require: true},
    Read: {type: Boolean, require: true},
    RecipientID: {type: String, require: true},
    SenderID: {type: String, require: true},
    Message: {type: String, require: true},
    ClassName: String,
    Url: {type: String, require: true},
});

export const NotificationModel = model<Notification>('notification', NotificationSchema);