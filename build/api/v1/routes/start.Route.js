"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routersApi = void 0;
var class_Route_1 = __importDefault(require("./routersApi/class.Route"));
var member_Route_1 = __importDefault(require("./routersApi/member.Route"));
var account_Router_1 = __importDefault(require("./routersApi/account.Router"));
var classStructure_Router_1 = __importDefault(require("./routersApi/classStructure.Router"));
var mark_Route_1 = __importDefault(require("./routersApi/mark.Route"));
var reviewMark_Router_1 = __importDefault(require("./routersApi/reviewMark.Router"));
function routersApi(app) {
    app.use("/api/class", class_Route_1.default);
    app.use("/api/member", member_Route_1.default);
    app.use("/api/account", account_Router_1.default);
    app.use("/api/class-structure", classStructure_Router_1.default);
    app.use("/api/mark", mark_Route_1.default);
    app.use("/api/review-mark", reviewMark_Router_1.default);
}
exports.routersApi = routersApi;
