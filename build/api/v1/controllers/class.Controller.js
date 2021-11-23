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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classController = void 0;
// Interfaces
// Middlewares
var async_Middleware_1 = require("../middlewares/async.Middleware");
// services
var class_Service_1 = require("../services/class.Service");
var crypto_random_string_1 = __importDefault(require("crypto-random-string"));
var member_Service_1 = require("../services/member.Service");
var nodemailer_1 = __importDefault(require("nodemailer"));
var ClassController = /** @class */ (function () {
    function ClassController() {
        var _this = this;
        this.getClassByIDUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var IDUser, _a, dataUser, message, status, dbCodeClass_1, _b, data, message_1, status_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        IDUser = res.locals.data._doc._id;
                        return [4 /*yield*/, member_Service_1.memberServices.getClassByIDUser(IDUser)];
                    case 1:
                        _a = _c.sent(), dataUser = _a.dataUser, message = _a.message, status = _a.status;
                        if (!(status === 200)) return [3 /*break*/, 3];
                        dbCodeClass_1 = [];
                        dataUser.map(function (d, k) {
                            dbCodeClass_1.push(d.CodeClass);
                        });
                        return [4 /*yield*/, class_Service_1.classServices.getClassByListCodeClass(dbCodeClass_1)];
                    case 2:
                        _b = _c.sent(), data = _b.data, message_1 = _b.message, status_1 = _b.status;
                        res.status(status_1).send({ data: data, message: message_1 });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(status).send({ message: message });
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.createClass = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var IDUser, CodeClass, _a, data_1, message_2, status_2, Title, Theme, Part, Image, Room, _b, data, message, status, _c, data_2, message_3, status_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        IDUser = res.locals.data._doc._id;
                        _d.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        CodeClass = crypto_random_string_1.default({ length: 7 });
                        return [4 /*yield*/, class_Service_1.classServices.getsingleCodeClass(CodeClass)];
                    case 2:
                        _a = _d.sent(), data_1 = _a.data, message_2 = _a.message, status_2 = _a.status;
                        if (data_1 === null) {
                            return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        Title = req.body.Title || "test";
                        Theme = req.body.Theme || "";
                        Part = req.body.Part || "";
                        Image = "https://www.gstatic.com/classroom/themes/img_backtoschool.jpg";
                        Room = req.body.Room || "";
                        return [4 /*yield*/, class_Service_1.classServices.createClass(IDUser, CodeClass, Title, Theme, Part, Image, Room)];
                    case 4:
                        _b = _d.sent(), data = _b.data, message = _b.message, status = _b.status;
                        if (!(data !== null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, member_Service_1.memberServices.addMember(IDUser, CodeClass, "Teacher", true)];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, class_Service_1.classServices.getClassByCodeClass(CodeClass)];
                    case 6:
                        _c = _d.sent(), data_2 = _c.data, message_3 = _c.message, status_3 = _c.status;
                        res.status(status_3).send({ data: data_2, message: message_3 });
                        _d.label = 7;
                    case 7:
                        res.status(status).send({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getClassByCodeClass = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var CodeClass, IDUser, _a, data, message, status, _b, data_3, message_4, status_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        CodeClass = String(req.query.codeclass);
                        IDUser = res.locals.data._doc._id;
                        return [4 /*yield*/, member_Service_1.memberServices.checkMemberValidClassroom(IDUser, CodeClass)];
                    case 1:
                        _a = _c.sent(), data = _a.data, message = _a.message, status = _a.status;
                        if (!(data !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, class_Service_1.classServices.getClassByCodeClass(CodeClass)];
                    case 2:
                        _b = _c.sent(), data_3 = _b.data, message_4 = _b.message, status_4 = _b.status;
                        res.status(status_4).send({ data: data_3, message: message_4 });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(status).send({ data: data, message: message });
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.inviteClassroom = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, path, transporter, mailOptions;
            return __generator(this, function (_a) {
                email = String(req.query.email);
                path = String(req.query.path);
                console.log("haha", req.query);
                transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    auth: {
                        user: process.env.MAIL,
                        pass: process.env.PASS, // generated ethereal password
                    },
                });
                mailOptions = {
                    from: "Classroom",
                    to: email,
                    subject: "Email mời bạn tham gia lớp học ✔",
                    text: "Chào mừng bạn đến với Classroom",
                    html: "<b>Nhấn vào đường link để có thể tham gia khóa học: " +
                        path +
                        "<b>.Vui lòng không chia sẽ link với bất kỳ ai!",
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (error) {
                                console.log(error);
                                res
                                    .status(400)
                                    .json({ data: "failed", message: "can not send email" });
                            }
                            else {
                                res.status(200).json({ data: "success", message: "success" });
                            }
                            return [2 /*return*/];
                        });
                    });
                });
                return [2 /*return*/];
            });
        }); });
    }
    return ClassController;
}());
exports.classController = new ClassController();
