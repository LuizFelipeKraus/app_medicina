const Sequelize = require('sequelize');
const sequelize = require('../sequelize'); // Importe a instância do Sequelize

const TipoDeConvenio = sequelize.define('TipoDeConvenio', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

TipoDeConvenio.sync({force: false})

module.exports = TipoDeConvenio;