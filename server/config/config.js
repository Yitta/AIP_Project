module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'cheapcheep_dev',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'cheapcheep',
    host: '',
    dialect: 'mysql'
  },
  test: {
    username: '',
    password: null,
    database: '',
    host: '',
    dialect: 'mysql'
  }
};