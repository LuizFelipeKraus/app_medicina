const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_consultorio01', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;