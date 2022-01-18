"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3rd dependencies
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
/*
Node-config reads configuration files in the ./config directory for the running process,
typically the application root.
This can be overridden by setting the $NODE_CONFIG_DIR environment variable
to the directory containing your configuration files.
It can also be set from node, before loading Node-config:
*/
var path_1 = __importDefault(require("path"));
process.env['NODE_CONFIG_DIR'] = path_1.default.join(__dirname, './config');
// get process.env
dotenv_1.config();
// server initialization
var app = express_1.default();
// connect backend to DB
var connectDB_1 = require("./start/connectDB");
connectDB_1.connectDB();
// start socket.io
var socketIO_1 = require("./start/socketIO");
var http_1 = require("http");
var server = http_1.createServer(app);
socketIO_1.startSocketIO(server);
// set view engine
var ejsConfig_1 = require("./start/ejsConfig");
ejsConfig_1.setViewEngine(app);
// handle Middleware => cors, helmet,...
var start_Middleware_1 = require("./api/v1/middlewares/start.Middleware");
start_Middleware_1.startMiddleware(app);
//passport middleware
//import passport from './api/v1/middlewares/passport.Middleware';
// app.use(passport.initialize());
//  router api
var start_Route_1 = require("./api/v1/routes/start.Route");
start_Route_1.routersApi(app);
//handle Middleware error
var unexpectedError_Middleware_1 = require("./api/v1/middlewares/unexpectedError.Middleware");
app.use(unexpectedError_Middleware_1.unexpectedError);
// listen on port: default port = 5000
var PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});
