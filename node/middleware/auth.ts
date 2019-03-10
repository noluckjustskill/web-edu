import { db, Op } from '../database';

export default async (req: IRequest<null>, res: IResponse<null>, next: any) => {

  try {

    if (req.url.indexOf('/auth') !== -1 || req.url.indexOf('/login') !== -1 || req.url.indexOf('/public') !== -1) {
      next();
      return;
    }

    const key: string = req.cookies['console-auth'] || req.headers['console-auth'];

    // Проверить ключ авторизации в базе

    if ( !key || !key.length) {
      console.log(`Unauthorized request to ${req.url}`);
      res.redirect('/login');
      return;
    }

    const userId = await db.site.models.auth.findOne({
      where: { key },
    }).then((row) => {
      return row ? row.userId : null;
    });

    if (userId !== null) {
      await db.site.models.users.findOne({
        where: { id: userId },
      }).then((row) => {
        req.auth = {
          userId,
          name: row.name,
          role: row.role,
        }
      });
    } else {
      res.redirect('/login');
      return;
    }

    next();

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
