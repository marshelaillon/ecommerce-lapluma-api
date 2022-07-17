const express = require('express');
const Sequelize = require('sequelize');
const { Books } = require('../models');
const { Users } = require('../models');
const router = express.Router();
const genre = require('./genre.js');
const userRouter = require('./users');
const category = require('./category');
const order = require('./orders');
const jwt = require('jsonwebtoken');
const userExtractor = require('../middlewares/userExtractor');

router.use('/users', userRouter);

// rutas de género (psicología, horror, etc.)
router.use('/genre', genre);
// rutas por categoría (autor, precio, editorial)
router.use('/category', category);
// rutas de los pedidos
router.use('/orders', order);

//Ruta que devuelva los productos cuyo nombre coinsida con la búsqueda del usuario
router.get('/book/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const books = await Books.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${title}%`,
        },
      },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: 'No hubo resultados',
    });
  }
});

//rutas de productos

router.get('/products', async (req, res) => {
  const books = await Books.findAll();
  res.send(books);
});

router.get('/products/:id', async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  if (!book) res.send('Not found ');
  else {
    res.send(book);
  }
});

// ADMIN ROUTES
router.post('/products', userExtractor, async (req, res) => {
  try {
    const book = await Books.create(req.body);
    if (!book) res.send('Failed to create  ');
    else {
      res.send(book);
    }
  } catch (error) {
    console.log(error);

  }
});

router.put('/products/:id', userExtractor, async (req, res) => {
  const [rows, result] = await Books.update(
    {
      title: req.body.title,
      author: req.body.author,
      sinopsis: req.body.sinopsis,
      genre: req.body.genre,
      price: req.body.price,
      editorial: req.body.editorial,
      image: req.body.image,
    },
    { where: { id: req.params.id }, returning: true }
  );
  res.send(result[0]);
});

router.delete('/products/:id', userExtractor, async (req, res) => {
  await Books.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});


router.post('/admin/login', async (req, res) => {
  const admin = await Users.findOne({ where: { email: req.body.email } });
  if (!admin) {
    res.status(401).json({
      error: 'invalid user or password',
    });
  }
  const userForToken = {
    id: admin.dataValues.id,
    mail: admin.mail,
  };
  const token = jwt.sign(userForToken, 'plataforma.rojo.azul.messi');
  res.send({
    ...admin.dataValues,
    token,
  });
});

module.exports = router;
