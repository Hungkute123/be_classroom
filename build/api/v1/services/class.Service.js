"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.classServices = void 0;
var class_Model_1 = require("../models/class.Model/class.Model");
var ClassServices = /** @class */ (function () {
    function ClassServices() {
        var _this = this;
        this.getClassByListCodeClass = function (CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var classes, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.find({ CodeClass: { $in: CodeClass } })];
                    case 1:
                        classes = _a.sent();
                        if (classes.length === 0) {
                            return [2 /*return*/, {
                                    data: null,
                                    message: "can not find class",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                data: classes,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createClass = function (IDUser, CodeClass, Title, Theme, Part, Image, Room) { return __awaiter(_this, void 0, void 0, function () {
            var createClass, saveClass, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        createClass = new class_Model_1.ClassModel({
                            IDUser: IDUser,
                            CodeClass: CodeClass,
                            Title: Title,
                            Theme: Theme,
                            Part: Part,
                            Image: Image,
                            Room: Room,
                        });
                        return [4 /*yield*/, createClass.save()];
                    case 1:
                        saveClass = _a.sent();
                        return [2 /*return*/, {
                                data: saveClass,
                                message: "Create Class Success",
                                status: 200,
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getsingleCodeClass = function (CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var classes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.find({ CodeClass: CodeClass })];
                    case 1:
                        classes = _a.sent();
                        if (classes.length === 0) {
                            return [2 /*return*/, {
                                    data: null,
                                    message: "can not find class with codeclass",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                data: classes,
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
        this.getClassByCodeClass = function (CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var classes, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.findOne({ CodeClass: CodeClass })];
                    case 1:
                        classes = _a.sent();
                        if (classes === null) {
                            return [2 /*return*/, {
                                    data: null,
                                    message: "can not find class",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                data: classes,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.isOwnerClass = function (IDUser, CodeClass) { return __awaiter(_this, void 0, void 0, function () {
            var classes, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.findOne({ CodeClass: CodeClass })];
                    case 1:
                        classes = _a.sent();
                        if (classes !== null && classes.IDUser === IDUser) {
                            return [2 /*return*/, {
                                    data: true,
                                    message: "owner class",
                                    status: 400,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    data: false,
                                    message: "not owner class",
                                    status: 200,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getListClass = function () { return __awaiter(_this, void 0, void 0, function () {
            var classes, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.aggregate([
                                { "$addFields": { "userId": { "$toObjectId": "$IDUser" } } },
                                {
                                    "$lookup": {
                                        from: "users",
                                        localField: "userId",
                                        foreignField: "_id",
                                        as: "info"
                                    }
                                }
                            ])];
                    case 1:
                        classes = _a.sent();
                        console.log(classes[0].info[0].Name);
                        if (classes.length != 0) {
                            return [2 /*return*/, {
                                    data: classes,
                                    message: "Success",
                                    status: 200,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    data: null,
                                    message: "Fail",
                                    status: 400,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error(error_6.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateClass = function (classroom, key) { return __awaiter(_this, void 0, void 0, function () {
            var update, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.findOneAndUpdate(__assign({}, key), { $set: __assign({}, classroom) })];
                    case 1:
                        update = _a.sent();
                        if (update) {
                            return [2 /*return*/, {
                                    data: true,
                                    message: "Class update successfully",
                                    status: 200,
                                }];
                        }
                        return [2 /*return*/, {
                                data: false,
                                message: "Update failed",
                                status: 200,
                            }];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error(error_7.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteClass = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var del, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, class_Model_1.ClassModel.deleteOne({ _id: id })];
                    case 1:
                        del = _a.sent();
                        if (del) {
                            return [2 /*return*/, {
                                    data: true,
                                    message: "Class delete successfully",
                                    status: 200,
                                }];
                        }
                        return [2 /*return*/, {
                                data: false,
                                message: "Delete failed",
                                status: 200,
                            }];
                    case 2:
                        error_8 = _a.sent();
                        throw new Error(error_8.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ClassServices;
}());
exports.classServices = new ClassServices();
