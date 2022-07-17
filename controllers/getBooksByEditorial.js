const { Books } = require('../models');

const getBooksByEditorial = async (req, res) => {
  try {
    const books = await Books.findAll({
      order: [['editorial', 'ASC']],
    });
    res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getBooksByEditorial;
