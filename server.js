const express = require('express');
const passport = require('passport');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const models = require('./server/models');
const mysql = require('./server/config/db');

const app = express();
const database = mysql.database;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

database.connect((err) => {
  console.log('Connected');
  database.query('CREATE DATABASE IF NOT EXISTS cheap_cheep', (err, result) => {
    if (err) throw err;
    models.sequelize.sync().then(() => {
      models.user.findOrCreate({
          where: { username: 'admin' },
          defaults: {
            email: 'admin@cheapcheep.life',
            username: 'admin',
            passwordHash: '21232F297A57A5A743894A0E4A801FC3',
            accountType: 'admin'
          },
        })
    });
  });
});

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
