const S = require('sequelize');
const db = require('../db/');

class Books extends S.Model {
  async decreaseStock(quantity) {
    this.quantity -= quantity;
    await this.save();
  }
}

Books.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    author: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
    editorial: {
      type: S.STRING,
      allowNull: false,
    },
    sinopsis: {
      type: S.TEXT,
      allowNull: false,
    },
    image: {
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
  { sequelize: db, modelName: 'books' }
);

module.exports = Books;
