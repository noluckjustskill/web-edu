import { STRING, INTEGER, DATE, TIME, Instance, Sequelize, Model } from 'sequelize';

interface IAttributes {
  id?: number;
  userId: number;
  recordBook: number;
  groupNumber: number;
  faculty: string;
  direction: string;
  admissionYear: Date;
  photoUrl: string;
}

interface IInstance extends Instance<IAttributes>, IAttributes {

}

const init = (connection: Sequelize) => {

  return connection.define<IInstance, IAttributes>('information', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    userId: {
      type: INTEGER,
      field: 'user_id',
    },
    recordBook: {
        type: INTEGER,
        field: 'record_book',
    },
    groupNumber: {
        type: INTEGER,
        field: 'group_number',
    },
    faculty: STRING,
    direction: STRING,
    admissionYear: {
        type: DATE,
        field: 'admission_year',
    },
    photoUrl: {
        type: STRING,
        field: 'photo_url',
    },
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'information',
      name: { singular: 'information', plural: 'information' },
    });

};

type Type = Model<IInstance, IAttributes>;

export {
  init,
  IInstance,
  IAttributes,
  Type,
};
