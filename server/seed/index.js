const sequelizeFixtures = require('sequelize-fixtures');
const models = require('../models');
const bcrypt = require('bcrypt-nodejs');
const mysql = require('mysql2');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const database = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password
});


console.log('Connecting to database...');
database.connect((err) => {
  console.log('Dropping database...');
  database.query(`DROP DATABASE IF EXISTS ${config.database}`, (err, res) => {
    if (err) throw err;
    console.log('Creating new database...');
    database.query(`CREATE DATABASE ${config.database}`, (err, res) => {
      if (err) throw err;
      console.log('Database ready for data.');
      models.sequelize.sync().then(() => {
        sequelizeFixtures
          .loadFile(__dirname + '/seed.json', models, {
            transformFixtureDataFn: (data) => {
              if (data.password) {
                data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
              }
              return data;
            }
          })
          .then(() => {
            console.log('Seeding complete.');
          });
      });
    });
  });
});
