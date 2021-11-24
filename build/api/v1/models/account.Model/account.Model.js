"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
var mongoose_1 = require("mongoose");
var AccountSchema = new mongoose_1.Schema({
    Email: { type: String, require: true },
    Name: { type: String, require: true },
    Password: { type: String, require: true },
    Phone: String,
    MSSV: String,
    Year: String,
    Introduce: String,
    Birth: String,
    Gender: String,
    Permission: Number,
    CodeClass: String,
    Status: Boolean,
    Image: String,
});
exports.AccountModel = mongoose_1.model("users", AccountSchema);
