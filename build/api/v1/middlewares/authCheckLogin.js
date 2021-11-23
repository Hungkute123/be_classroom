"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheckLogin = void 0;
var authCheckLogin = function (req, res, next) {
    if (!req.user)
        return res.redirect('/Auth/login');
    else
        return next();
};
exports.authCheckLogin = authCheckLogin;
