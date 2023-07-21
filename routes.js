const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const pokemonController = require('./controllers/pokemonController');
const dashboardController = require('./controllers/dashboardController');

// Rota raiz
router.get('/', (req, res) => {
  res.render('home');
});

// Rotas para autenticação
router.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error') });
});

router.get('/register', (req, res) => {
  res.render('register', { messages: req.flash('error') });
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Rotas para os Pokémons
router.get('/pokemons', pokemonController.getPokemonsPage);

// Rotas para o dashboard (requer autenticação)
router.get('/dashboard', dashboardController.getDashboardPage);
router.post('/addFavorite', dashboardController.addFavorite);


// Rota para adicionar um Pokémon favorito (POST request)
router.post('/addFavorite', dashboardController.addFavorite);

// rota para remover pokemon
router.post('/removeFavorite', dashboardController.removeFavorite);


// Rota de logout
router.get('/logout', (req, res) => {
  // Verificar se o usuário está logado
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // Destruir a sessão do usuário (fazer logout)
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

// jogo
router.get('/pokemonWorld', (req, res) => {
  res.render('playPokemon')
})
  
module.exports = router;
