const Sequelize = require('sequelize');
const sequelize = require('../sequelize'); // Importe a instância do Sequelize

const Usuario = sequelize.define('Usuario', {
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Usuario.sync({force: false})

module.exports = Usuario;