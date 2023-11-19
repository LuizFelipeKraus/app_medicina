const Sequelize = require('sequelize');
const sequelize = require('../sequelize'); // Importe a instância do Sequelize
const TipoDeCirurgia = require('./TipoDeCirurgia'); // Importe o modelo TipoDeCirurgia
const TipoDeConvenio = require('./TipoDeConvenio'); // Importe o modelo TipoDeConvenio

const Cirurgia = sequelize.define('Cirurgia', {
    medico: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dia: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    pago: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

// Relacione a cirurgia com o tipo de cirurgia
Cirurgia.belongsTo(TipoDeCirurgia);

// Relacione a cirurgia com o tipo de convênio
Cirurgia.belongsTo(TipoDeConvenio);

Cirurgia.sync({force: false})

module.exports = Cirurgia;
