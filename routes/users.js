const express = require('express');
const userRouter = express.Router();
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//rutas de usuarios
userRouter.get('/:id', async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (user === null) res.send('Not found ');
  else {
    res.send(user);
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    await Users.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const users = await Users.findAll();
    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const [rows, result] = await Users.update(
      {
        // email: req.body.email,
        // password: req.body.password,
        admin: req.body.admin,
      },
      { where: { id: req.params.id }, returning: true }
    );
    res.send(result[0]);
  } catch (error) {
    res.sendStatus(500);
  }
});

userRouter.post('/login', async (req, res) => {
  const user = await Users.findOne({ where: { email: req.body.email } });
  const passwordIsCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.password);
  if (!(user && passwordIsCorrect)) {
    return res.status(401).json({
      error: 'invalid user or password',
    });
  }
  const userForToken = {
    id: user.id,
    mail: user.mail,
  };
  const token = jwt.sign(userForToken, 'plataforma.rojo.azul.messi');
  res.send({
    ...user.dataValues,
    token,
  });
});

userRouter.post('/logout', (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

userRouter.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      ...req.body,
      password,
    };
    const user = await Users.create(newUser);
    res.status(201).send(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = userRouter;
