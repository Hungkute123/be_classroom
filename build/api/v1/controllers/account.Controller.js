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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var axios_1 = __importDefault(require("axios"));
var crypto_random_string_1 = __importDefault(require("crypto-random-string"));
var nodemailer_1 = __importDefault(require("nodemailer"));
// dotenv
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Interfaces
// Middlewares
var async_Middleware_1 = require("../middlewares/async.Middleware");
// services
var account_Service_1 = require("../services/account.Service");
var AccountController = /** @class */ (function () {
    function AccountController() {
        var _this = this;
        this.login = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, email, pass, password, ret, data, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        email = String(body.Email);
                        pass = String(body.Password);
                        return [4 /*yield*/, account_Service_1.accountServices.getPasswordByEmail(email)];
                    case 1:
                        password = _a.sent();
                        if (!password) return [3 /*break*/, 3];
                        ret = bcrypt_1.default.compareSync(pass, password);
                        if (!ret) return [3 /*break*/, 3];
                        return [4 /*yield*/, account_Service_1.accountServices.getAccount({ Email: email }, { Password: 0, __v: 0 })];
                    case 2:
                        data = _a.sent();
                        accessToken = jsonwebtoken_1.default.sign(__assign({}, data), process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: process.env.TIMERESET,
                        });
                        res.status(200).json({ data: accessToken, message: "Login success" });
                        return [2 /*return*/];
                    case 3:
                        res.status(200).json({ data: false, message: "Login failed" });
                        return [2 /*return*/];
                }
            });
        }); });
        this.loginWithGoogle = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, jwtGoogle;
            var _this = this;
            return __generator(this, function (_a) {
                body = req.body;
                jwtGoogle = String(body.jwt);
                axios_1.default({
                    method: "GET",
                    url: "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + jwtGoogle,
                })
                    .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var isEmail, email, pass, account, _a, data, message, status_1, user, accessToken;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isEmail = response.data.email_verified;
                                if (!isEmail) return [3 /*break*/, 3];
                                email = response.data.email;
                                pass = bcrypt_1.default.hashSync("123456", Number(process.env.ROUNDS));
                                account = {
                                    Email: email,
                                    Name: response.data.name,
                                    Image: response.data.picture,
                                    Password: pass,
                                    Phone: "",
                                    MSSV: "",
                                    Year: "",
                                    Introduce: "",
                                    Birth: "",
                                    Gender: "",
                                    Permission: "User",
                                    CodeClass: "",
                                    Status: false,
                                };
                                return [4 /*yield*/, account_Service_1.accountServices.register(account, email)];
                            case 1:
                                _a = _b.sent(), data = _a.data, message = _a.message, status_1 = _a.status;
                                return [4 /*yield*/, account_Service_1.accountServices.getAccount({ Email: email }, { Password: 0, __v: 0 })];
                            case 2:
                                user = _b.sent();
                                accessToken = jsonwebtoken_1.default.sign(__assign({}, user), process.env.ACCESS_TOKEN_SECRET, {
                                    expiresIn: process.env.TIMERESET,
                                });
                                res
                                    .status(200)
                                    .json({ data: accessToken, message: "Login success" });
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            });
        }); });
        this.register = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, email, pass, name, passCover, account, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body;
                        email = String(body.Email);
                        pass = String(body.Password);
                        name = String(body.Name);
                        passCover = bcrypt_1.default.hashSync(pass, Number(process.env.ROUNDS));
                        account = {
                            Email: email,
                            Password: passCover,
                            Name: name,
                            Phone: "",
                            MSSV: "",
                            Year: "",
                            Introduce: "",
                            Birth: "",
                            Gender: "",
                            Permission: "User",
                            CodeClass: "",
                            Status: true,
                            Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhvWpQrh3nIxmjLBQSyH5uu7OKpprR2b4-g&usqp=CAU",
                            CreateDate: Date(),
                        };
                        return [4 /*yield*/, account_Service_1.accountServices.register(account, email)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.getInfo = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, account_Service_1.accountServices.getAccount({
                            Email: res.locals.email,
                        }, { Password: 0, __v: 0 })];
                    case 1:
                        data = _a.sent();
                        res.status(200).json({ data: data });
                        return [2 /*return*/];
                }
            });
        }); });
        this.updateAccount = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, key, account, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body;
                        key = __assign({}, body.key);
                        account = __assign({}, body.account);
                        console.log(key, account);
                        return [4 /*yield*/, account_Service_1.accountServices.updateAccount(account, key)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.updatePass = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, email, password, passwordNew, passOld, ret, account, _a, data, message, status_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body;
                        email = body.Email;
                        password = body.Password;
                        passwordNew = body.PasswordNew;
                        return [4 /*yield*/, account_Service_1.accountServices.getPasswordByEmail(email)];
                    case 1:
                        passOld = _b.sent();
                        ret = bcrypt_1.default.compareSync(password, passOld);
                        if (!ret) return [3 /*break*/, 3];
                        account = {
                            Email: email,
                            Password: bcrypt_1.default.hashSync(passwordNew, Number(process.env.ROUNDS)),
                        };
                        return [4 /*yield*/, account_Service_1.accountServices.updateAccount(__assign({}, account), { Email: email })];
                    case 2:
                        _a = _b.sent(), data = _a.data, message = _a.message, status_2 = _a.status;
                        res.status(status_2).json({ data: data, message: message });
                        return [2 /*return*/];
                    case 3:
                        res.status(200).json({ data: false, message: "Incorrect password" });
                        return [2 /*return*/];
                }
            });
        }); });
        this.updateMSSV = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, email, mssv, account, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body;
                        email = body.Email;
                        mssv = body.MSSV;
                        return [4 /*yield*/, account_Service_1.accountServices.getAccount({ MSSV: mssv }, { _id: 0, Password: 0 })];
                    case 1:
                        account = _b.sent();
                        if (account) {
                            res.status(200).json({ data: false, message: "MSSV already exists" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, account_Service_1.accountServices.updateAccount({ MSSV: mssv }, { Email: email })];
                    case 2:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.adminLogin = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, email, pass, password, ret, data, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        email = String(body.Email);
                        pass = String(body.Password);
                        return [4 /*yield*/, account_Service_1.accountServices.getPasswordByEmail(email)];
                    case 1:
                        password = _a.sent();
                        if (!password) return [3 /*break*/, 3];
                        ret = bcrypt_1.default.compareSync(pass, password);
                        if (!ret) return [3 /*break*/, 3];
                        return [4 /*yield*/, account_Service_1.accountServices.getAccount({ Email: email }, { Password: 0, __v: 0 })];
                    case 2:
                        data = _a.sent();
                        if (data && data.Permission === "Admin") {
                            accessToken = jsonwebtoken_1.default.sign(__assign({}, data), process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: process.env.TIMERESET,
                            });
                            res.status(200).json({ data: accessToken, message: "Login success" });
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        res.status(200).json({ data: false, message: "Login failed" });
                        return [2 /*return*/];
                }
            });
        }); });
        this.adminRegister = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, email, pass, fullName, passCover, account, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body;
                        email = String(body.email);
                        pass = String(body.password);
                        fullName = String(body.full_name);
                        passCover = bcrypt_1.default.hashSync(pass, Number(process.env.ROUNDS));
                        account = {
                            Email: email,
                            Password: passCover,
                            Name: fullName,
                            Phone: "",
                            Year: "",
                            Introduce: "",
                            Birth: "",
                            Gender: "",
                            Permission: "Admin",
                            Status: true,
                            Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhvWpQrh3nIxmjLBQSyH5uu7OKpprR2b4-g&usqp=CAU",
                            CreateDate: Date(),
                        };
                        return [4 /*yield*/, account_Service_1.accountServices.register(account, email)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.getListUserAccounts = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, account_Service_1.accountServices.getListAccountsWithPermission('User')];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.getListAdminAccounts = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, account_Service_1.accountServices.getListAccountsWithPermission('Admin')];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.deleteAccount = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, id, _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = req.query;
                        id = query.id;
                        return [4 /*yield*/, account_Service_1.accountServices.deleteAccount(id)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
        this.forgotPassword = async_Middleware_1.asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var email, password, passwordEncode, _a, data, message, status, transporter, mailOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = req.body.email;
                        password = crypto_random_string_1.default({ length: 8, type: "base64" });
                        passwordEncode = bcrypt_1.default.hashSync(password, Number(process.env.ROUNDS));
                        return [4 /*yield*/, account_Service_1.accountServices.forgotPassword(email, passwordEncode)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        if (data) {
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
                                subject: "Hệ thống ClassRoom - Mật khẩu mới của tài khoản",
                                text: "Chào mừng bạn đến với Classroom",
                                html: "Mật khẩu mới của bạn là <b>" +
                                    password +
                                    "</b> <br> Hãy đổi mật khẩu ngay nhé !!!",
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (error) {
                                            console.log(error);
                                            res
                                                .status(400)
                                                .json({ data: false, message: "can not send email" });
                                        }
                                        else {
                                            res.status(status).json({ data: data, message: message });
                                        }
                                        return [2 /*return*/];
                                    });
                                });
                            });
                            return [2 /*return*/];
                        }
                        res.status(status).json({ data: data, message: message });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return AccountController;
}());
exports.accountController = new AccountController();
