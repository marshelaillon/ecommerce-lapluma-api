require('dotenv').config();
const express = require('express');
const db = require('./db');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use('/api', routes);

(async () => {
  try {
    await db.sync({ force: false });
    app.listen(3001, () => {
      console.log('server is running on port 3001');
    });
  } catch (error) {
    console.log('Unable to connect to the database', error.message);
  }
})();
