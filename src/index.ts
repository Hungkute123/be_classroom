// 3rd dependencies
import express, { Express } from 'express';
import { config } from 'dotenv';

/* 
Node-config reads configuration files in the ./config directory for the running process, 
typically the application root. 
This can be overridden by setting the $NODE_CONFIG_DIR environment variable 
to the directory containing your configuration files. 
It can also be set from node, before loading Node-config: 
*/
import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, './config');

// get process.env
config();
// server initialization
const app: Express = express();

// connect backend to DB
import { connectDB } from './start/connectDB';
connectDB();

// start socket.io
import { startSocketIO } from './start/socketIO';
import { createServer } from "http";
const server = createServer(app);
startSocketIO(server);

// set view engine
import { setViewEngine } from './start/ejsConfig';
setViewEngine(app);

// handle Middleware => cors, helmet,...
import { startMiddleware } from './api/v1/middlewares/start.Middleware';
startMiddleware(app);
//passport middleware
//import passport from './api/v1/middlewares/passport.Middleware';
// app.use(passport.initialize());
//  router api
import { routersApi } from './api/v1/routes/start.Route';
routersApi(app);
//handle Middleware error
import { unexpectedError } from './api/v1/middlewares/unexpectedError.Middleware';
app.use(unexpectedError);

// listen on port: default port = 5000
const PORT: any = process.env.PORT || 5000;
server.listen(PORT, (): void => {
	console.log(`http://localhost:${PORT}`);
});
