const S = require('sequelize');
const db = require('../db/index');

class Genres extends S.Model {}

Genres.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
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
  { sequelize: db, modelName: 'genres' }
);

module.exports = Genres;
