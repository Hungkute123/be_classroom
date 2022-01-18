"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewMarkModel = void 0;
var mongoose_1 = require("mongoose");
var ReviewMarkSchema = new mongoose_1.Schema({
    Name: { type: String, require: true },
    MSSV: { type: String, require: true },
    TypeMark: { type: String, require: true },
    CodeClass: { type: String, require: true },
    CurrentMark: { type: Number, require: true },
    DesiredMark: { type: Number, require: true },
    CommentStudent: { type: String, require: true },
    FinalMask: Number,
    Answer: String,
    Status: { type: Boolean, require: true },
});
exports.ReviewMarkModel = mongoose_1.model("reviewmarks", ReviewMarkSchema);
