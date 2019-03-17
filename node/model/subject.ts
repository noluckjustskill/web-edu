import { STRING, INTEGER, ENUM, Instance, Sequelize, Model } from 'sequelize';
import { IInstance as IAuth } from './auth';

interface IAttributes {
  id?: number;
  name: string;
  }

interface IInstance extends Instance<IAttributes>, IAttributes {
  auth: IAuth[];
}

const init = (connection: Sequelize) => {

  return connection.define<IInstance, IAttributes>('subject', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    name: STRING,
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'subject',
      name: { singular: 'subject', plural: 'subject' },
    });

};

type Type = Model<IInstance, IAttributes>;

export {
  init,
  IInstance,
  IAttributes,
  Type,
};
