const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const http = require('http');
const passport = require('passport');
const path = require('path');
const pg = require('pg')
const session = require('express-session');

const api = require('./server/routes/api');
const config = require('./server/config/config')[process.env.NODE_ENV || 'development'];
const models = require('./server/models');

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
require('./server/middleware/passport.js')(passport, models.user);

// Use the generated Angular front-end
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

models.checkDatabase()
  .then(() => {
    models.sequelize
    .sync()
    .then(() => {
      console.log('Database ready!');
    });
  })
  .catch((err) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
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
