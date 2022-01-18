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
exports.memberServices = void 0;
var models_1 = require("../models");
var member_Model_1 = require("../models/member.Model/member.Model");
var MemberServices = /** @class */ (function () {
    function MemberServices() {
        var _this = this;
        this.addMember = function (IDUser, CodeClass, Permission, Status, Name, Image, MSSV) { return __awaiter(_this, void 0, void 0, function () {
            var addMember, saveMember, mark, addMark, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        addMember = new member_Model_1.MemberModel({
                            IDUser: IDUser,
                            CodeClass: CodeClass,
                            Permission: Permission,
                            Status: Status,
                        });
                        return [4 /*yield*/, addMember.save()];
                    case 1:
                        saveMember = _a.sent();
                        return [4 /*yield*/, models_1.MarkModel.findOne({
                                Name: Name,
                                MSSV: MSSV,
                                CodeClass: CodeClass,
                            })];
                    case 2:
                        mark = _a.sent();
                        if (!!mark) return [3 /*break*/, 4];
                        addMark = new models_1.MarkModel({
                            Name: Name,
                            MSSV: MSSV,
                            CodeClass: CodeClass,
                            IDUser: IDUser,
                            Image: Image,
                        });
                        return [4 /*yield*/, addMark.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            data: saveMember,
                            message: "Tham gia lớp học thành công",
                            status: 200,
                        }];
                    case 5:
                        error_1 = _a.sent();
                        throw new Error(error_1.messages);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getTeacherByCodeClass = function (CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var members, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, member_Model_1.MemberModel.find({
                                CodeClass: CodeClass,
                                Permission: "Teacher",
                            })];
                    case 1:
                        members = _a.sent();
                        if (members === null) {
                            return [2 /*return*/, {
                                    dataTeacher: members,
                                    message: "can not find teacher",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                dataTeacher: members,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStudentByCodeClass = function (CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var members, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, member_Model_1.MemberModel.find({
                                CodeClass: CodeClass,
                                Permission: "Student",
                            })];
                    case 1:
                        members = _a.sent();
                        if (members === null) {
                            return [2 /*return*/, {
                                    dataStudent: members,
                                    message: "can not find student",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                dataStudent: members,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.checkMemberValidClassroom = function (IDUser, CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var members, classroom, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, member_Model_1.MemberModel.findOne({
                                IDUser: IDUser,
                                CodeClass: CodeClass,
                            })];
                    case 1:
                        members = _a.sent();
                        return [4 /*yield*/, models_1.ClassModel.findOne({
                                CodeClass: CodeClass,
                            })];
                    case 2:
                        classroom = _a.sent();
                        if (classroom === null) {
                            return [2 /*return*/, {
                                    data: "Lớp học không tồn tại",
                                    message: "Lớp học không tồn tại",
                                    status: 401,
                                }];
                        }
                        if (members === null && classroom != null) {
                            return [2 /*return*/, {
                                    data: "Bạn chưa tham gia lớp học",
                                    message: "Bạn chưa tham gia lớp học",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                data: members,
                                message: "Bạn đã tham gia lớp học",
                                status: 200,
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error(error_4.messages);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getClassByIDUser = function (IDUser) { return __awaiter(_this, void 0, void 0, function () {
            var members, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, member_Model_1.MemberModel.find({ IDUser: IDUser })];
                    case 1:
                        members = _a.sent();
                        if (members === null) {
                            return [2 /*return*/, {
                                    dataUser: members,
                                    message: "can not find teacher",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                dataUser: members,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return MemberServices;
}());
exports.memberServices = new MemberServices();
