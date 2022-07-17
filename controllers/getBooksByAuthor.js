const { Books } = require('../models');

const getBooksByAuthor = async (req, res) => {
  try {
    const books = await Books.findAll({
      order: [['author', 'ASC']],
    });
    res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getBooksByAuthor;
