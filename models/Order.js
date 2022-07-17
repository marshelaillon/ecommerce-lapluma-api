const S = require('sequelize');
const db = require('../db');

class Orders extends S.Model {}

Orders.init(
  {
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: S.INTEGER,
      allowNull: false,
    },
    status: {
      type: S.STRING,
      defaultValue: 'pending',
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
  { sequelize: db, modelName: 'orders' }
);

module.exports = Orders;
