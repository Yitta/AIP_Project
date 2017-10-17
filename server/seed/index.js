const bcrypt = require('bcrypt-nodejs');
const config = require('../config/config')['development']; // Only for dev
const models = require('../models');
const sequelizeFixtures = require('sequelize-fixtures');

console.log('Connecting to database...');
models.checkDatabase()
  .then(() => {
    models.sequelize
      .drop()
      .then(() => {
        models.sequelize
          .sync()
          .then(() => {
            console.log("Populating tables...")
            sequelizeFixtures
              .loadFile(`${__dirname}/seed.json`, models, {
                transformFixtureDataFn: (data) => {
                  if (data.password) {
                    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
                  }
                  return data;
                } 
              })
          })
          .then(() => {
            console.log('Seeding complete.');
            process.exit(0);
          });
      });
  })
  .catch((err) => {
    if (err.syscall !== "listen") {
      throw err;
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
        throw err;
    }
  });
