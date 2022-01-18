"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
var mongoose_1 = require("mongoose");
var ClassSchema = new mongoose_1.Schema({
    IDUser: { type: String, require: true },
    CodeClass: { type: String, require: true },
    Title: { type: String, require: true },
    Theme: String,
    Part: String,
    Image: { type: String, require: true },
    Room: String,
    Status: Boolean,
});
exports.ClassModel = mongoose_1.model('class', ClassSchema);
