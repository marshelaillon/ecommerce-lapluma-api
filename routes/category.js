const router = require('express').Router();
const getBooksByAuthor = require('../controllers/getBooksByAuthor');
const getBooksByPrice = require('../controllers/getBooksByPrice');
const getBooksByEditorial = require('../controllers/getBooksByEditorial');

router.get('/author', getBooksByAuthor);
router.get('/price', getBooksByPrice);
router.get('/editorial', getBooksByEditorial);

module.exports = router;
