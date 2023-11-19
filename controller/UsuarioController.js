const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

class UsuarioController{

    criarUsuario = async (nome, login, senha, res) => {
        try {
            const senhaHash = await bcrypt.hash(senha, 10);
            const usuario = await Usuario.create({
                login,
                senha: senhaHash,
                nome,
            });
            res.status(201).json({ message: 'Usuário criado com sucesso' });

        } catch (err) {
            console.error('Erro ao registrar o usuário:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });

        }
    };
}



module.exports = UsuarioController;