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
var passport_1 = __importDefault(require("passport"));
var models_1 = require("../models");
var account_Service_1 = require("../services/account.Service");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
passport_1.default.serializeUser(function (user, done) {
    return done(null, user._id);
});
passport_1.default.deserializeUser(function (email, done) { return __awaiter(void 0, void 0, void 0, function () {
    var doc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, account_Service_1.accountServices.getAccount({
                    Email: email,
                }, { Password: 0, __v: 0 })];
            case 1:
                doc = _a.sent();
                return [2 /*return*/, done(null, doc)];
        }
    });
}); });
passport_1.default.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}, function (jwt_payload, done) {
    models_1.AccountModel.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));
passport_1.default.use(new GoogleStrategy({
    clientID: "" + process.env.GOOGLE_CLIENT_ID,
    clientSecret: "" + process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, function (_, __, email, profile, cb) {
    var _this = this;
    models_1.AccountModel.findOne({ googleId: profile.id }, function (err, doc) { return __awaiter(_this, void 0, void 0, function () {
        var account, _a, data, message, status_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (err) {
                        return [2 /*return*/, cb(err, null)];
                    }
                    if (!!doc) return [3 /*break*/, 2];
                    account = {
                        Email: email,
                        Name: profile.displayName,
                        Image: profile.photos.value,
                        Password: "",
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
                    cb(null, account);
                    _b.label = 2;
                case 2:
                    cb(null, doc);
                    return [2 /*return*/];
            }
        });
    }); });
}));
exports.default = passport_1.default;
