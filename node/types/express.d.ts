/* tslint:disable:interface-name */

import { Request, Response } from 'express';

import 'express';

declare global {
  namespace Express {

    interface Request {
      auth: null | {
        userId: number;
        login: string;
        type: 'admin' | 'dealer' | 'source';
        name: string;
        lang: 'en' | 'ru';
        permissions: 'rw' | 'ro';
        dealer: { [dealer: string]: boolean };
        source: { [source: string]: boolean };
        selectedDealer?: string;
        selectedSource?: string;
      };
    }
  }

  interface IRequest<Body> extends Request {
    query: Body;
    body: Body;
    files?: {
      [key: string]: {
        name: string;
        data: Buffer;
        md5: () => string;
      };
    };
  }

  interface IResponse<Body> extends Response {
    send: (body: Body) => IResponse<Body>;
    status: (code: number) => IResponse<Body>;
  }
}
