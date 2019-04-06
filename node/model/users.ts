import { STRING, INTEGER, ENUM, Instance, Sequelize, Model } from 'sequelize';
import { IInstance as IAuth } from './auth';
import { IInstance as IInformation } from './information';

interface IAttributes {
  id?: number;
  name: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}

interface IInstance extends Instance<IAttributes>, IAttributes {
  auth: IAuth[];
  information: IInformation;
}

const init = (connection: Sequelize) => {

  return connection.define<IInstance, IAttributes>('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    name: STRING,
    password: STRING,
    role: ENUM('admin', 'teacher', 'student'),
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users',
      name: { singular: 'users', plural: 'users' },
    });

};

type Type = Model<IInstance, IAttributes>;

export {
  init,
  IInstance,
  IAttributes,
  Type,
};
