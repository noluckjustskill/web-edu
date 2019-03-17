import { STRING, INTEGER, ENUM, DATE, Instance, Sequelize, Model } from 'sequelize';
import { IInstance as IAuth } from './auth';

interface IAttributes {
  id?: number;
  date: Date;
  }

interface IInstance extends Instance<IAttributes>, IAttributes {
  auth: IAuth[];
}

const init = (connection: Sequelize) => {

  return connection.define<IInstance, IAttributes>('semester', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    date: DATE,
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'semester',
      name: { singular: 'semester', plural: 'semester' },
    });

};

type Type = Model<IInstance, IAttributes>;

export {
  init,
  IInstance,
  IAttributes,
  Type,
};
