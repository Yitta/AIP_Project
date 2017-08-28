const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const models = require('./server/models');
const mysql = require('mysql2');
const sequelizeFixtures = require('sequelize-fixtures');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const mysqlDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null
});
mysqlDb.connect((err) => {
  console.log('Connected');
  mysqlDb.query('CREATE DATABASE IF NOT EXISTS cheap_cheep', (err, result) => {
    if (err) throw err;
    models.sequelize.sync().then(() => {
      models.user.findOrCreate({
          where: { username: 'admin' },
          defaults: {
            email: 'admin@cheapcheep.life',
            username: 'admin',
            passwordHash: '$2a$10$n1zFNg5qgpJgDpASiZP0au9WOgtgv6fC4SBRCiW8bz5awo4b96jAG',
            accountType: 'admin'
          },
        })
    });
  });
});

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
