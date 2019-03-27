import { STRING, INTEGER, ENUM, Instance, Sequelize, Model } from 'sequelize';
import { IInstance as IUsers } from './users';
import { IInstance as ISemester } from './semester';
import { IInstance as ISubject } from './subject';


interface IAttributes {
  id?: number;
  userId: number;
  subjectId: number;
  semesterId: number;
  mark: '2' | '3' | '4' | '5';
  }

interface IInstance extends Instance<IAttributes>, IAttributes {
  users: IUsers;
  subject: ISubject;
  semester: ISemester;
}


const init = (connection: Sequelize) => {

  return connection.define<IInstance, IAttributes>('marks', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    userId: {
        type: INTEGER,
        field: 'user_id',
    },
    subjectId: {
        type: INTEGER,
        field: 'subject_id',
    },
    semesterId: {
        type: INTEGER,
        field: 'semester_id',
    },
    mark: ENUM('2', '3', '4', '5'),
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'marks',
      name: { singular: 'marks', plural: 'marks' },
    });

};

type Type = Model<IInstance, IAttributes>;

export {
  init,
  IInstance,
  IAttributes,
  Type,
};
