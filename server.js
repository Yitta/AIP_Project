const api = require('./server/routes/api');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const env = require('dotenv').load();
const express = require('express');
const http = require('http');
const models = require('./server/models');
const morgan = require('morgan');
const mysql = require('./server/config/database');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const app = express();
const database = mysql.database;

// Setting up cross origin calls
app.use(cors({
  origin: [new RegExp('http://127.0.0.1:*')] // remove in prod
}))

app.use(morgan('dev'));

app.use(cookieParser());

// Set the server to return json as default
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

// Required for passport.js auth
app.use(session({ secret: 'supersecrettoken', resave: true, saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);
require('./server/middleware/passport.js')(passport, models.user);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

database.connect((err) => {
  console.log('Connected');
  database.query('CREATE DATABASE IF NOT EXISTS cheap_cheep', (err, result) => {
    if (err) throw err;
    models.sequelize.sync();
  });
});

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
