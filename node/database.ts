import * as Sequelize from 'sequelize';

import * as Users from './model/users';
import * as Auth from './model/auth';

interface IDBConfig {
  database: string;
  host: string[];
  username: string;
  password: string;
  dialect: string;
  timezone: string;
}

interface IModelsSite {
  users: Sequelize.Model<Users.IInstance, Users.IAttributes>;
  auth: Sequelize.Model<Auth.IInstance, Auth.IAttributes>;
}

export interface IDB {
  site?: {
    connection: Sequelize.Sequelize;
    models: IModelsSite;
    instances: Array <{
      connection: Sequelize.Sequelize;
      models: IModelsSite;
    }>;
    index: number;
    config: IDBConfig;
  };
}

export interface IAttributes {
  site: {
    users: Users.IAttributes,
    auth: Auth.IAttributes,
  };
}

export const configDatabase: IDBConfig = require('../../config/database.json');
export const Op = Sequelize.Op;

export const db: IDB = {};

Object.keys(configDatabase).forEach((dbName) => {

  const config = configDatabase[dbName];

  const instances = config.host.map((host: string) => {

    console.log(`Connecting config DB ${dbName} at ${host}`);

    const connection = new Sequelize(config.database, config.username, config.password, {
      host,
      dialect: config.dialect,
      operatorsAliases: false,
      logging: false,
      pool: {
        max: 5,
        min: 1,
        acquire: 600000,
        idle: 10000,
      },
      define: {
        timestamps: false,
        freezeTableName: true,
      },
      timezone: config.timezone,
    });

    const models: any = {};

    if (dbName === 'site') {

      models.users = Users.init(connection);
      models.auth = Auth.init(connection);

      models.users.hasMany(models.auth, { foreignKey: 'userId' });
      models.auth.belongsTo(models.users, { foreignKey: 'userId' });
    }

    return {
      connection,
      models,
    };
  });

  db[dbName] = {
    connection: instances[0].connection,
    models: instances[0].models,
    instances,
    index: 0,
    config,
  };

});
