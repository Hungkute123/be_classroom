"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassStructureModel = void 0;
var mongoose_1 = require("mongoose");
var ClassStructureSchema = new mongoose_1.Schema({
    CodeClass: { type: String, require: true },
    MarkType: { type: String, require: true },
    Mark: { type: Number, require: true },
    Complete: { type: Boolean, require: true }
});
exports.ClassStructureModel = mongoose_1.model('classStructure', ClassStructureSchema);
