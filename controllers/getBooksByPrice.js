const { Books } = require('../models');

const getBooksByPrice = async (req, res) => {
  try {
    const books = await Books.findAll({
      order: [['price', 'ASC']],
    });
    res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getBooksByPrice;
