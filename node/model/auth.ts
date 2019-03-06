import { STRING, INTEGER, TIME, Instance, Sequelize, Model } from 'sequelize';

interface IAttributes {
  id?: number;
  userId: number;
  key: string;
  created: Date;
}

interface IInstance extends Instance<IAttributes>, IAttributes {

}

const init = (connection: Sequelize) => {

  return connection.define<IInstance, IAttributes>('auth', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    userId: {
      type: INTEGER,
      field: 'user_id',
    },
    key: STRING,
    created: TIME,
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'auth',
      name: { singular: 'auth', plural: 'auth' },
    });

};

type Type = Model<IInstance, IAttributes>;

export {
  init,
  IInstance,
  IAttributes,
  Type,
};
