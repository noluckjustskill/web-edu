import { Request, Response } from 'express';

 
export default async (req: Request, res: Response) => {
    res.clearCookie("key");
    res.redirect('/login');
}