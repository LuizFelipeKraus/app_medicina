const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotas = require('./rotas'); // Importe o arquivo de rotas
const exphbs = require('express-handlebars');

// Configure o Handlebars como mecanismo de visualização
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use as rotas definidas
app.use('/', rotas);

app.get('/registro', (req, res) => {
    res.render('registro.hbs'); // Renderiza o arquivo registro.handlebars
});

app.get('/login', (req, res) => {
    res.render('login.hbs'); // Renderiza o arquivo registro.handlebars
});

app.get('/lista_cirurgias', (req, res) => {
    res.render('lista_cirurgias.hbs'); // Renderiza o arquivo registro.handlebars
});

app.get('/tela_principal', (req, res) => {
    res.render('tela_principal.hbs'); // Renderiza o arquivo registro.handlebars
});

// Resto das configurações e inicialização do servidor
// ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});