const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-express', 'root', 'mysqlnode', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
