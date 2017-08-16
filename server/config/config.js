module.exports = {
    development: {
      url: 'mysql://root@localhost:3306/aip_movies',
      dialect: 'mysql'
    },
      production: {
      url: process.env.DATABASE_URL,
      dialect: 'mysql'
    },
      staging: {
      url: process.env.DATABASE_URL,
      dialect: 'mysql'
    },
      test: {
      url: process.env.DATABASE_URL,
      dialect: 'mysql'
    }
};