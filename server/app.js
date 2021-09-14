const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const dbConnect = require('./connection');
const routes = require('./routes/index');

const app = express();

dotenv.config({ path: './.env' });
dbConnect();

// Enable Cors
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup Session Middleware
app.use(session({
  secret: process.env.PRIVATE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
}));

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

module.exports = app;
