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
exports.accountServices = void 0;
var models_1 = require("../models");
var AccountServices = /** @class */ (function () {
    function AccountServices() {
        var _this = this;
        this.getAccount = function (key, criteria) {
            if (criteria === void 0) { criteria = { _id: 0, __v: 0 }; }
            return __awaiter(_this, void 0, void 0, function () {
                var account, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, models_1.AccountModel.findOne(__assign({}, key), __assign({}, criteria))];
                        case 1:
                            account = _a.sent();
                            return [2 /*return*/, account];
                        case 2:
                            error_1 = _a.sent();
                            throw new Error(error_1.messages);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        this.getAccountByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var account, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.findOne({ Email: email }, { __v: 0, Password: 0 })];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, account];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPasswordByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var password, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.findOne({ Email: email }, { Password: 1, _id: 0 })];
                    case 1:
                        password = _a.sent();
                        if (password) {
                            return [2 /*return*/, password.Password];
                        }
                        return [2 /*return*/, ""];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.register = function (account, email) { return __awaiter(_this, void 0, void 0, function () {
            var isAccount, createAccount, saveAccount, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.AccountModel.find({ Email: email }, { Password: 0, _id: 0, __v: 0 })];
                    case 1:
                        isAccount = _a.sent();
                        if (isAccount.length != 0) {
                            return [2 /*return*/, {
                                    data: false,
                                    message: "Account already exists",
                                    status: 200,
                                }];
                        }
                        createAccount = new models_1.AccountModel(__assign({}, account));
                        return [4 /*yield*/, createAccount.save()];
                    case 2:
                        saveAccount = _a.sent();
                        return [2 /*return*/, {
                                data: true,
                                message: "Register Success",
                                status: 200,
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error(error_4.messages);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateAccount = function (account, key) { return __awaiter(_this, void 0, void 0, function () {
            var update, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.findOneAndUpdate(__assign({}, key), { $set: __assign({}, account) })];
                    case 1:
                        update = _a.sent();
                        if (update) {
                            return [2 /*return*/, {
                                    data: true,
                                    message: "Account update successfully",
                                    status: 200,
                                }];
                        }
                        return [2 /*return*/, {
                                data: false,
                                message: "Update failed",
                                status: 200,
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getInfoByListID = function (listID) { return __awaiter(_this, void 0, void 0, function () {
            var info, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.find({ _id: { $in: listID } }, { Password: 0, __v: 0 })];
                    case 1:
                        info = _a.sent();
                        if (info.length === 0) {
                            return [2 /*return*/, {
                                    data: null,
                                    message: "Not available",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                data: info,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error(error_6.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getListAccountsWithPermission = function (Permission) { return __awaiter(_this, void 0, void 0, function () {
            var list, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.find({ Permission: Permission }, { Password: 0, __v: 0 })];
                    case 1:
                        list = _a.sent();
                        if (list.length === 0) {
                            return [2 /*return*/, {
                                    data: null,
                                    message: "Not available",
                                    status: 400,
                                }];
                        }
                        return [2 /*return*/, {
                                data: list,
                                message: "Success",
                                status: 200,
                            }];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error(error_7.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAccount = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var del, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.deleteOne({ _id: id })];
                    case 1:
                        del = _a.sent();
                        if (del) {
                            return [2 /*return*/, {
                                    data: true,
                                    message: "Account delete successfully",
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
        this.forgotPassword = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
            var update, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.AccountModel.findOneAndUpdate({ Email: email }, { $set: { Password: password } })];
                    case 1:
                        update = _a.sent();
                        if (update) {
                            return [2 /*return*/, {
                                    data: true,
                                    message: "Successfully updated new password",
                                    status: 200,
                                }];
                        }
                        return [2 /*return*/, {
                                data: false,
                                message: "New password update failed",
                                status: 200,
                            }];
                    case 2:
                        error_9 = _a.sent();
                        throw new Error(error_9.messages);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return AccountServices;
}());
exports.accountServices = new AccountServices();
