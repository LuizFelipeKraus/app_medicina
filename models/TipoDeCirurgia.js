const Sequelize = require('sequelize');
const sequelize = require('../sequelize'); // Importe a instância do Sequelize

const TipoDeCirurgia = sequelize.define('TipoDeCirurgia', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


TipoDeCirurgia.sync({force: false})

module.exports = TipoDeCirurgia;