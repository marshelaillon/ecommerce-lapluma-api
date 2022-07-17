const { Books } = require('../models');
const { Genres } = require('../models');

const getBookByGenre = async (req, res) => {
  try {
    const nameGenre = req.params.genre;
    const genre = await Genres.findOne({ where: { name: nameGenre } });
    const books = await Books.findAll({ where: { genresId: genre.id } });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getBookByGenre;
