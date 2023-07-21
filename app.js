const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');
const { isLoggedIn, error404 } = require('./middlewares/authMiddleware');

const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

// Configuração do banco de dados MongoDB
mongoose.connect('mongodb+srv://pedro:HDUuSNqxtg5u8Mp@testes.6fgfntt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

// Middleware para verificar se o usuário está logado
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});



// Usar as rotas definidas no arquivo routes.js
app.use(routes);

app.use(flash());

// Middleware para verificar se o usuário está logado
app.use(isLoggedIn);

// Usar as rotas definidas no arquivo routes.js
app.use(routes);

// Middleware para capturar solicitações não correspondentes a rotas definidas
app.use(error404);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
