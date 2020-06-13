import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { uri } from './config/database';
import mysqlConnect from './config/mysql';
import path from 'path';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import passport = require('passport');
import flash from 'connect-flash';
import { configPassport } from './config/passport';
import { router } from './routes';
import * as http from "http";
import { isVip } from './model/vip';

mongoose.connect(uri, { useNewUrlParser: true });
const mysqlConnection = mysqlConnect;
mysqlConnection.connect();

mysqlConnection.query('show tables', function(err, rows, fields) {
  if (err) 
  console.log(err);
  for (let i in rows) {
    let item = [];
    for (let j in rows[i]) item.push(rows[i][j].toString());
    console.log(item);
 }
});

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use(session({secret: 'shhsecret', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

configPassport();

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.send(200);
   } else {
       next();
   }
});


app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user.local);
    res.locals.user = req.user.local;
  }
  next();
});

app.use(async (req, res, next) => {
  if (req.isAuthenticated()) {
    const name = req.user.local ? req.user.local.email as string : '';
    if (name && await isVip(name)) {
      res.locals.isVip = true;
    }
  }
  next();
});

app.use(router);

app.use(function(req, res, next) {
  const err = new Error('Not found') as any;
  err.status = 404;
  next(err);
});


app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  res.status((err as any).status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

const server = http.createServer(app);

server.listen(5000);
server.on('error', function (error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = 'Port 5000';

  
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

console.log('now listening at localhost:5000');