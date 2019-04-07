import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as upload from 'express-fileupload';
import * as path from 'path';

import * as configHttp from '../config/http.json';
import { Auth } from './middleware';
import startController from './controller';
import AuthController from './controller/auth';
import LogoutController from './controller/logout';
import ClientController from './controller/client';

export const app = Express();

app.disable('x-powered-by');
app.disable('etag');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded());
app.use(cookieParser());
app.use(upload());
app.set('view engine', 'ejs');

app.use(Auth);

startController('/api');

app.use('/public', Express.static('../public'));
app.get('/', (req, res, next) => {
  ClientController(req).then((obj) => {
    res.render('../view/index.ejs', obj);
  });
});


app.get('/login', (req, res, next) => {
  res.render('../view/login.ejs');
});

app.post('/auth', AuthController);

app.get('/logout', LogoutController);

app.listen(configHttp.port, configHttp.ip, () => {
  console.log(`Started HTTP server at ${configHttp.ip}:${configHttp.port}`);
});
