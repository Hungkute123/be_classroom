"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModel = void 0;
var mongoose_1 = require("mongoose");
var MemberSchema = new mongoose_1.Schema({
    IDUser: { type: String, require: true },
    CodeClass: { type: String, require: true },
    Permission: { type: String, require: true },
    Status: { type: Boolean, require: true }
});
exports.MemberModel = mongoose_1.model('member', MemberSchema);
