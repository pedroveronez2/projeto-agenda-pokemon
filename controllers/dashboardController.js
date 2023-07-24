// controllers/dashboardController.js

const pokeapi = require('../config/pokeapi');
const User = require('../models/user');
const axios = require('axios');

// Rota para exibir o dashboard com os Pokémons do usuário
const getDashboardPage = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(req.session.user?._id);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    res.render('dashboard', { user, errorMessage: req.flash('error'), messageSuccess: req.flash('success') });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar o usuário.');
  }
};

// Rota para adicionar um Pokémon no time
const addPokemon = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error', 'Você precisa estar logado para adicionar um Pokémon no seu time.');
      return res.redirect('/login');
    }

    const { pokemonName } = req.body;

    // Verificar se o usuário já possui 6 Pokémons no time
    const user = await User.findById(req.session.user?._id);
    if (user.team.length >= 6) {
      req.flash('error', 'Você já possui 6 Pokémons no time. Remova um Pokémon antes de adicionar mais.');
      return res.redirect('/pokemons');
    }

    // Verificar se o Pokémon já foi adicionado no time
    if (user.team.some((team) => team.name === pokemonName)) {
      req.flash('error', `${pokemonName} já foi adicionado no time.`);
      return res.redirect('/pokemons');
    }

    // Obter informações completas do Pokémon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const { id, name, sprites, types } = response.data;
    const newPokemon = {
      id,
      name,
      image: sprites.front_default,
      types: types.map((type) => type.type.name),
    };

    // Adicionar o Pokémon time do usuário
    await User.findByIdAndUpdate(req.session.user._id, { $push: { team: newPokemon } });

    req.flash('success', `${pokemonName} foi adicionado no time!`);
    res.redirect('/pokemons');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao adicionar o Pokémon no time.');
    res.redirect('/pokemons');
  }
};

// Rota para remover um Pokémon do time
const removePokemon = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash('error', 'Você precisa estar logado para remover um Pokémon do time.');
      return res.redirect('/login');
    }

    const { pokemonName } = req.body;

    // Remover o Pokémon do time do usuário
    await User.findByIdAndUpdate(req.session.user._id, { $pull: { team: { name: pokemonName } } });

    req.flash('success', `${pokemonName} foi removido do time!`);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao remover o Pokémon do time.');
    res.redirect('/dashboard');
  }
};

// rota detalhe do pokemon do time
const pokemonTeamDetails = async (req, res) => {
  try {

    const pokemonDetails = await pokeapi.getPokemonDetails(req.params.name);

    res.render('teamPokemon', { pokemon: pokemonDetails })
  } catch (err) {
    console.error('Erro ao buscar detalhes do Pokémon:', err);
    res.status(500).send('Erro ao buscar detalhes do Pokémon.');
  }
}

module.exports = {
  getDashboardPage,
  addPokemon,
  removePokemon,
  pokemonTeamDetails
};
