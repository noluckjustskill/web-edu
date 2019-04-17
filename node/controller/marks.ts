import { db, Op } from '../database';

interface IResponseBody {
    marks: Array<{
        subject: string;
        mark: '2' | '3' | '4' | '5';
        semester: Date;
    }>;
  }
export default async (req: IRequest<null>, res: IResponse<IResponseBody>) => {
    const result = (await db.site.models.marks.findAll({
        where: {
            userId: req.auth.userId,
        },
        include: [{
            model: db.site.models.subject,
            required: true,
        },{
            model: db.site.models.semester,
            required: true,
        }],
    })).map((mark) => ({
        subject: mark.subject.name,
        mark: mark.mark,
        semester: mark.semester.date,
    }));
    
    res.send({marks: result})
}