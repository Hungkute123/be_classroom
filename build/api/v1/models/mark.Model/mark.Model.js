"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkModel = void 0;
var mongoose_1 = require("mongoose");
var MarkSchema = new mongoose_1.Schema({
    IDUser: String,
    Image: String,
    Name: { type: String, require: true },
    MSSV: { type: String, require: true },
    CodeClass: { type: String, require: true },
    Point: Object,
});
exports.MarkModel = mongoose_1.model("marks", MarkSchema);
