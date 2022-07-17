const router = require('express').Router();
const Order = require('../models/Order');
const Users = require('../models/Users');
const Books = require('../models/Books');
const nodemailer = require('nodemailer');

// creating a new order for a customer (orders)
router.post('/', async (req, res) => {
  try {
    const books = req.body; // array of books
    const orders = await Order.bulkCreate(books);
    orders.map(async order => {
      const book = await Books.findByPk(order.productId);
      await book.decreaseStock(order.quantity);
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

// returning all orders for a specific customer (historial of orders: complete)
router.get('/history/:id', async (req, res) => {
  try {
    const customer = await Users.findByPk(req.params.id);
    const orders = await customer.getOrders({
      where: { status: 'complete' },
      attributes: ['quantity', 'totalPrice', 'updatedAt'],
      include: [
        {
          model: Books,
          foreignKey: 'productId',
          attributes: ['title', 'image', 'price'],
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.sendStatus(500);
  }
});

// returning all orders for a specific customer (historial of orders: pending)
router.get('/:id', async (req, res) => {
  try {
    const customer = await Users.findByPk(req.params.id);
    const orders = await customer.getOrders({
      attributes: ['quantity', 'totalPrice', 'id', 'status'],
      include: [
        {
          model: Books,
          foreignKey: 'productId',
          attributes: ['title', 'image', 'price', 'quantity'],
        },
      ],
      where: { status: 'pending' },
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// modify the quantity and the status: complete of an order given the id of the order
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);
    (async () => {
      try {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'marshel.aillon@gmail.com',
            pass: 'mbrqkymtmlhzmazd',
          },
        });

        let mailOptions = {
          from: 'lapluma@gmail.ar',
          to: 'gastonchemi@gmail.com, marshel.aillon@gmail.com, pauquiriti@hotmail.com, javi11_97@hotmail.com, mariangel8ruiz@gmail.com',
          subject: 'La Pluma - Compras',
          text: 'Su compra fue realizada correctamente!',
          html: `<div>Su compra fue realizada correctamente!!</div>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).send(error.message);
          } else {
            return res.status(200).send('Email sent');
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    })();
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// deleting an order from the database
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    order.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
