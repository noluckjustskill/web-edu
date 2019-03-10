import { Request, Response } from 'express';
import { db, Op } from '../database';

interface IRequestBody {
  login: string;
  pass: string;
}

const makeKey = (l: number): string => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < l; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export default async (req: IRequest<IRequestBody>, res: Response) => {
  db.site.models.users.findOne({
    where: {
      name: req.body.login,
      password: req.body.pass,
    },
  }).then((row) => {
    if (!row) {
      res.redirect('/login?bad=true');
    } else {

      const key = makeKey(32);
      db.site.models.auth.create({
        userId: row.id,
        key,
        created: new Date(),
      }).then(() => {
        res.cookie('console-auth', key);
        res.redirect('/');
      }).catch((e) => {
        console.log(e);
        res.redirect('/login?bad=true');
      });
    }
  });
}