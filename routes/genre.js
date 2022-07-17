const router = require('express').Router();
const getBookByGenre = require('../controllers/getBookByGenre.js');
const userExtractor = require('../middlewares/userExtractor.js');
const { Genres } = require('../models/');

router.get('/genres', async (req, res) => {
  try {
    const genres = await Genres.findAll();
    res.status(200).send(genres);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/genre', userExtractor, async (req, res) => {
  try {
    const genre = req.body.name && await Genres.create(req.body);
    if (!genre) return res.status(403).send('Failed to create');
    else {
      res.send(genre);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/genre/:id', userExtractor , async (req, res) => {
  try {
    await Genres.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/genre/:id', userExtractor, async (req, res) => {
  try {
    const [rows, result] = await Genres.update(
      {
        name: req.body.name,
      },
      { where: { id: req.params.id }, returning: true }
    );
    res.send(result[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:genre', getBookByGenre);
module.exports = router;
