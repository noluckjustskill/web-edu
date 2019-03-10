import { Request, Response } from 'express';

interface IRequestBody {};

interface IResponseBody {
  name: string;
}

export default async (req: IRequest<IRequestBody>, res: IResponse<IResponseBody>) => {
  res.send({
    name: req.auth.name,
  });
}