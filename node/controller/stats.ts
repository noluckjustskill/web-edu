import { Request, Response } from 'express';
import { db, Op } from '../database';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

interface IRequestBody {
    semester?: string;
}

interface IResponseBody {
    stats: {
        [semester: number]: {
            2: number;
            3: number;
            4: number;
            5: number;
        }
    };
}

export default async (req: IRequest<IRequestBody>, res: IResponse<IResponseBody>) => {
    const result = (await db.site.models.marks.findAll({
        where: {
            userId: req.auth.userId,
            semesterId: typeof req.query.semester !== 'undefined' ? {[Op.in]: req.query.semester.split(',')} : {[Op.ne]: null},
        },
    })).reduce((acc, curr) => {
        if (!acc[curr.semesterId]) {
            acc[curr.semesterId] = {};
        }

        if (!acc[curr.semesterId][curr.mark]) {
            acc[curr.semesterId][curr.mark] = 0;
        }

        acc[curr.semesterId][curr.mark]++;

        return acc;
    }, {});
    
    res.send({stats: result});
};
