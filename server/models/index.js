const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

// Load all the models
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

function checkDatabase() {
  return sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("Can't connect to the database.");
    });
}

// Export the db Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.checkDatabase = checkDatabase;

module.exports = db;
