const express = require('express');
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
}));

app.use('/api', routes);
module.exports = app;
