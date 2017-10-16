const api = require('./routes/api');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];
const crypto = require('crypto');
const express = require('express');
const http = require('http');
const models = require('./models');
const mysql = require('mysql2');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const app = express();

// Setting up cross origin calls
app.use(cors({
  origin: [new RegExp('http://127.0.0.1:*'), new RegExp('http://localhost:*')]
}));

// Set up cookies
app.use(cookieParser());

// Set the server to return json as default
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Required for passport.js auth
app.use(session({ 
  secret: generateKey(),
  resave: true,
  saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session());

// Set up the routes
app.use('/api', api);
require('./middleware/passport.js')(passport, models.user);

// Set the index file
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Sync the database
const database = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password
});

models.sequelize.sync().then(() => {
  console.log('Database ready!');
});

// Set the port
const port = process.env.PORT || '3000';
app.set('port', port);

// Serve the API
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

function generateKey () {
  const sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
};
