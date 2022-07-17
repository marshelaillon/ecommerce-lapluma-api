const Sequelize = require('sequelize');
let db;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // averiguar
      },
    },
  });
}

if (process.env.NODE_ENV === 'development') {
  db = new Sequelize('lapluma', null, null, {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
  });
}

module.exports = db;
