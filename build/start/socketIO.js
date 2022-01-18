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
exports.startSocketIO = void 0;
var socket_io_1 = require("socket.io");
var notification_Service_1 = require("../api/v1/services/notification.Service");
var startSocketIO = function (server) {
    //initializing the socket io connection 
    var io = new socket_io_1.Server(server, {
    // ...
    });
    io.on('connect', function (socket) {
        console.log("Client connected " + socket.id);
        socket.on("getNotification", function (_id) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, data, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_Service_1.notificationServices.getNotificationByIDUser(_id._id)];
                    case 1:
                        _a = _b.sent(), data = _a.data, message = _a.message, status = _a.status;
                        console.log("hihi", _id._id);
                        socket.join(_id._id);
                        io.to(_id._id).emit('dataNotification', { data: data });
                        return [2 /*return*/];
                }
            });
        }); });
        //add notification and send notification
        socket.on("sendNotification", function (notification) { return __awaiter(void 0, void 0, void 0, function () {
            var noti, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //send notification
                        console.log("huhu", notification.recipientID);
                        return [4 /*yield*/, notification_Service_1.notificationServices.addNotification(notification.notificationType, notification.createDate, notification.read, notification.recipientID, notification.senderID, notification.message, notification.className, notification.url)];
                    case 1:
                        noti = _a.sent();
                        console.log(noti);
                        data = [noti.data];
                        io.to(notification.recipientID).emit('newDataNotification', {
                            data: data
                            // NotificationType: notificationType,
                            // CreateDate: createDate,
                            // Read: read,
                            // RecipientID: recipientID,
                            // SenderID: senderID,
                            // Message: message,
                            // ClassName: className,
                            // Url: url,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("updateNotification", function (noti) {
            console.log("huhu", noti);
            notification_Service_1.notificationServices.updateNotification(noti.notification, noti.key);
        });
        //when the user exits the room
        socket.on("disconnect", function () {
            //the user is deleted from array of users and a left room message displayed
        });
    });
};
exports.startSocketIO = startSocketIO;
