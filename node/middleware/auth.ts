import { db, Op } from '../database';

export default async (req: IRequest<null>, res: IResponse<null>, next: any) => {

  try {

    const key: string = req.cookies['console-auth'] || req.headers['console-auth'];

    // Проверить ключ авторизации в базе

    if ( /* ключа нет */ ) {
      console.log(`Unauthorized request to ${req.url}`);
      res.redirect(/*  */);
      return;
    }

    if ( /* есть юзер для ключа */ ) {

      req.auth = {
        /* базовая инфа о сесси */
      };

    } else {
      req.auth = null;
    }

    next();

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
