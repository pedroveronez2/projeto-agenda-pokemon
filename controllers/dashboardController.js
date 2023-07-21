// controllers/dashboardController.js

const User = require('../models/user');
const axios = require('axios');

// Rota para exibir o dashboard com os Pokémons favoritos do usuário
const getDashboardPage = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(req.session.user?._id);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    res.render('dashboard', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar o usuário.');
  }
};

// Rota para adicionar um Pokémon favorito
const addFavorite = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error', 'Você precisa estar logado para adicionar um Pokémon aos favoritos.');
      return res.redirect('/login');
    }

    const { pokemonName } = req.body;

    // Verificar se o usuário já possui 4 Pokémons favoritos
    const user = await User.findById(req.session.user?._id);
    if (user.favorites.length >= 6) {
      req.flash('error', 'Você já possui 6 Pokémons favoritos. Remova um Pokémon antes de adicionar mais.');
      return res.redirect('/pokemons');
    }

    // Verificar se o Pokémon já foi adicionado aos favoritos
    if (user.favorites.some((favorite) => favorite.name === pokemonName)) {
      req.flash('error', 'Este Pokémon já foi adicionado aos favoritos.');
      return res.redirect('/pokemons');
    }

    // Obter informações completas do Pokémon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const { id, name, sprites, types } = response.data;
    const newFavorite = {
      id,
      name,
      image: sprites.front_default,
      types: types.map((type) => type.type.name),
    };

    // Adicionar o Pokémon aos favoritos do usuário
    await User.findByIdAndUpdate(req.session.user._id, { $push: { favorites: newFavorite } });

    req.flash('success', `${pokemonName} foi adicionado aos favoritos!`);
    res.redirect('/pokemons');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao adicionar o Pokémon aos favoritos.');
    res.redirect('/pokemons');
  }
};

// Rota para remover um Pokémon favorito
const removeFavorite = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error', 'Você precisa estar logado para remover um Pokémon dos favoritos.');
      return res.redirect('/login');
    }

    const { pokemonName } = req.body;

    // Remover o Pokémon dos favoritos do usuário
    await User.findByIdAndUpdate(req.session.user._id, { $pull: { favorites: { name: pokemonName } } });

    req.flash('success', `${pokemonName} foi removido dos favoritos!`);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao remover o Pokémon dos favoritos.');
    res.redirect('/dashboard');
  }
};

module.exports = {
  getDashboardPage,
  addFavorite,
  removeFavorite,
};
