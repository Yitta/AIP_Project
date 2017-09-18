const mysql = require('mysql2');

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null
});

module.exports = { 
  database, 
  url: 'mysql://root@localhost:3306/cheap_cheep'
};