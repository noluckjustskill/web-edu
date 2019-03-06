import * as Express from 'express';
import * as ejs from 'ejs';
import * as BodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as upload from 'express-fileupload';
import * as path from 'path';

import * as configHttp from '../config/http.json';
import { Auth } from './middleware';
import startController from './controller';

export const app = Express();

app.disable('x-powered-by');
app.disable('etag');

app.use(BodyParser.json());
app.use(cookieParser());
app.use(upload());
app.set('view engine', 'ejs');

app.use(Auth);

startController('/api');

app.use(Express.static(path.resolve(`${__dirname}/../../public`)));
app.get('*', (req, res, next) => {
  res.render(path.resolve(`${__dirname}/../../view/index.ejs`), {
    text: 'TEST',
  });
});

app.listen(configHttp.port, configHttp.ip, () => {
  console.log(`Started HTTP server at ${configHttp.ip}:${configHttp.port}`);
});
