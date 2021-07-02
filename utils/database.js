const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'node-express',
  user: 'root',
  password: 'mysqlnode',
});

module.exports = pool.promise();
