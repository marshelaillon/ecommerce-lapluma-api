const Books = require('./Books');
const Users = require('./Users');
const Order = require('./Order');
const Genres = require('./Genres');

Users.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Users, { foreignKey: 'customerId' });

Books.hasOne(Order, { foreignKey: 'productId' });
Order.belongsTo(Books, { foreignKey: 'productId' });

Genres.hasMany(Books, { foreignKey: 'genresId'});
Books.belongsTo(Genres, { foreignKey: 'genresId'});

module.exports = { Books, Users, Order, Genres };
