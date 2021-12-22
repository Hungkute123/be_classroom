"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberController = void 0;
// Interfaces
// Middlewares
var async_Middleware_1 = require("../middlewares/async.Middleware");
var member_Service_1 = require("../services/member.Service");
var services_1 = require("../services");
var MemberController = /** @class */ (function () {
    function MemberController() {
        var _this = this;
        this.getTeacherByCodeClass = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var CodeClass, IDUser, _a, data, message, status, dataTeacher, listID_1, _b, data_1, message_1, status_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        CodeClass = String(req.query.codeclass);
                        IDUser = res.locals.data._doc._id;
                        return [4 /*yield*/, member_Service_1.memberServices.checkMemberValidClassroom(IDUser, CodeClass)];
                    case 1:
                        _a = _c.sent(), data = _a.data, message = _a.message, status = _a.status;
                        if (!(data !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, member_Service_1.memberServices.getTeacherByCodeClass(CodeClass)];
                    case 2:
                        dataTeacher = (_c.sent()).dataTeacher;
                        listID_1 = [];
                        dataTeacher.map(function (d, k) {
                            listID_1.push(d.IDUser);
                        });
                        console.log("hung", listID_1);
                        return [4 /*yield*/, services_1.accountServices.getInfoByListID(listID_1)];
                    case 3:
                        _b = _c.sent(), data_1 = _b.data, message_1 = _b.message, status_1 = _b.status;
                        res.status(status_1).send({ data: data_1, message: message_1 });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(status).send({ data: data, message: message });
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.getStudentByCodeClass = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var CodeClass, dataStudent, listID, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        CodeClass = String(req.query.codeclass);
                        return [4 /*yield*/, member_Service_1.memberServices.getStudentByCodeClass(CodeClass)];
                    case 1:
                        dataStudent = (_b.sent()).dataStudent;
                        listID = [];
                        dataStudent.map(function (d, k) {
                            listID.push(d.IDUser);
                        });
                        return [4 /*yield*/, services_1.accountServices.getInfoByListID(listID)];
                    case 2:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).send({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.joinClassroom = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var CodeClass, Permission, IDUser, _a, data, message, status, _b, data_2, message_2, status_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        CodeClass = String(req.query.codeclass);
                        Permission = String(req.query.permission);
                        IDUser = res.locals.data._doc._id;
                        return [4 /*yield*/, member_Service_1.memberServices.checkMemberValidClassroom(IDUser, CodeClass)];
                    case 1:
                        _a = _c.sent(), data = _a.data, message = _a.message, status = _a.status;
                        if (!(status !== 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, member_Service_1.memberServices.addMember(IDUser, CodeClass, Permission, true)];
                    case 2:
                        _b = _c.sent(), data_2 = _b.data, message_2 = _b.message, status_2 = _b.status;
                        res.status(status_2).send({ data: data_2, message: message_2 });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(status).send({ data: data, message: message });
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.getMyInfo = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var CodeClass, IDUser, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        CodeClass = String(req.query.codeclass);
                        IDUser = res.locals.data._doc._id;
                        return [4 /*yield*/, member_Service_1.memberServices.checkMemberValidClassroom(IDUser, CodeClass)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).send({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.joinClassroomByCodeClass = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var CodeClass, Permission, IDUser, _a, data, message, status, _b, data_3, message_3, status_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        CodeClass = String(req.query.codeclass);
                        Permission = "Student";
                        IDUser = res.locals.data._doc._id;
                        return [4 /*yield*/, member_Service_1.memberServices.checkMemberValidClassroom(IDUser, CodeClass)];
                    case 1:
                        _a = _c.sent(), data = _a.data, message = _a.message, status = _a.status;
                        if (!(status !== 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, member_Service_1.memberServices.addMember(IDUser, CodeClass, Permission, true)];
                    case 2:
                        _b = _c.sent(), data_3 = _b.data, message_3 = _b.message, status_3 = _b.status;
                        res.status(status_3).send({ data: data_3, message: message_3 });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(status).send({ data: data, message: message });
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
    return MemberController;
}());
exports.memberController = new MemberController();
