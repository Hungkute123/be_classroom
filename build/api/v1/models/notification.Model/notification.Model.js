"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
var mongoose_1 = require("mongoose");
var NotificationSchema = new mongoose_1.Schema({
    NotificationType: { type: String, require: true },
    CreateDate: { type: String, require: true },
    Read: { type: Boolean, require: true },
    RecipientID: { type: String, require: true },
    SenderID: { type: String, require: true },
    Message: { type: String, require: true },
    ClassName: String,
    Url: { type: String, require: true },
});
exports.NotificationModel = mongoose_1.model('notification', NotificationSchema);
