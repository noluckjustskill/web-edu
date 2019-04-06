import { db, Op } from '../database';

interface IRequestBody {};

interface IResponseBody {
  name: string;
  record: number;
  group: number;
  faculty: string;
  direction: string;
  admissionYear: Date,
  photo: string;
}

export default async (req: IRequest<IRequestBody>): Promise<IResponseBody> => {
  return db.site.models.users.findOne({
    where: {
      id: req.auth.userId,
    },
    include: [{
      model: db.site.models.information,
      required: true,
    }],
  }).then((row) => {
    return {
      name: row.name,
      record: row.information.recordBook,
      group: row.information.groupNumber,
      faculty: row.information.faculty,
      direction: row.information.direction,
      admissionYear: row.information.admissionYear,
      photo: row.information.photoUrl,
    };
  });
}