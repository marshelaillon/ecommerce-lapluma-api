const S = require('sequelize');
const db = require('../db');

class Users extends S.Model {}

Users.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    admin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: S.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: S.DATE,
    },
  },
  { sequelize: db, modelName: 'users' }
);

module.exports = Users;
