
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
//const Usuario = require('./models/Usuario');
const UsuarioController = require('./controller/UsuarioController')
const Cirurgia = require('./models/Cirurgia');
const TipoDeCirurgia = require('./models/TipoDeCirurgia');
const TipoDeConvenio = require('./models/TipoDeConvenio');

// Rota de registro de usuário
router.post('/registro', async (req, res) => {
        const { login, senha, nome } = req.body;
        const usuario = new  UsuarioController().criarUsuario(nome, login, senha, res)
});

// Rota de autenticação de usuário
router.post('/login', async (req, res) => {
    const { login, senhanormal } = req.body;

    try {
      // Encontre o usuário com base no nome de usuário (ou email, se preferir)
      const usuario = await Usuario.findOne({ where: { login } });

      if (!usuario) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      // Use bcrypt.compare para verificar a senha
      const senhaCorreta = await bcrypt.compare(senhanormal, usuario.senha);

      if (senhaCorreta) {
        console.log('Usuário autenticado com sucesso:', usuario.toJSON());
        res.redirect('/tela_principal', authMiddleware);
      } else {
        res.redirect(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error('Erro na autenticação:', err);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
});
// Rota para buscar todos os usuários
router.get('/usuarios', (req, res) => {
    Usuario.findAll()
    .then((usuarios) => {
        res.json(usuarios);
    })
    .catch((err) => {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    });
});

// Rota para criar um novo tipo de convênio
router.post('/tipodeconvenio', async (req, res) => {
    try {
        const { nome } = req.body;
        const tipoDeConvenio = await TipoDeConvenio.create({ nome });
        res.status(201).json(tipoDeConvenio);
    } catch (error) {
        console.error('Erro ao criar tipo de convênio:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Rota para criar um novo tipo de cirurgia
router.post('/tipodecirurgia', async (req, res) => {
    try {
        const { nome } = req.body;
        const tipoDeCirurgia = await TipoDeCirurgia.create({ nome });
        res.status(201).json(tipoDeCirurgia);
    } catch (error) {
        console.error('Erro ao criar tipo de cirurgia:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});


router.post('/cirurgias', async (req, res) => {
    try {
        const { medico, dia, hora, pago, tipoDeCirurgiaId, tipoDeConvenioId } = req.body;

        // Verifique se os tipos de cirurgia e convênio existem
        const tipoDeCirurgia = await TipoDeCirurgia.findByPk(tipoDeCirurgiaId);
        const tipoDeConvenio = await TipoDeConvenio.findByPk(tipoDeConvenioId);

        if (!tipoDeCirurgia || !tipoDeConvenio) {
            return res.status(400).json({ error: 'Tipo de cirurgia ou convênio não encontrado' });
        }

        // Crie a cirurgia no banco de dados
        const cirurgia = await Cirurgia.create({
            medico,
            dia,
            hora,
            pago,
            TipoDeCirurgiaId: tipoDeCirurgiaId,
            TipoDeConvenioId: tipoDeConvenioId,
        });

        res.status(201).json(cirurgia);
    } catch (error) {
        console.error('Erro ao criar cirurgia:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Rota para listar todas as cirurgias
router.get('/cirurgias', async (req, res) => {
    try {
        const cirurgias = await Cirurgia.findAll({
            include: [TipoDeCirurgia, TipoDeConvenio],
        });
        res.json(cirurgias);
    } catch (error) {
        console.error('Erro ao buscar cirurgias:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Resto das rotas e configurações do Express
// ...

module.exports = router;
