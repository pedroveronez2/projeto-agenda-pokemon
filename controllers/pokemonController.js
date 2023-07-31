const pokeapi = require('../config/pokeapi');
const User = require('../models/user');

// Rota para exibir todos os 151 Pokémons
const getPokemonsPage = async (req, res) => {
  try {
    const pokemons = await pokeapi.getAllPokemons();

    const pokemonDetails = await Promise.all(
      pokemons.map(async (pokemon) => {
        return await pokeapi.getPokemonDetails(pokemon.name);
      })
    );

    res.render('pokemons', { pokemons: pokemonDetails, messageSuccess: req.flash('success'), errorMessage: req.flash('error') });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar os Pokémons.');
  }
};

const pokemon_details = async (req, res) => {
  try {

    const pokemonDetails = await pokeapi.getPokemonDetails(req.params.name);

    res.render('pokemon_details', { pokemon: pokemonDetails, pokeadd: true })
  } catch (err) {
    console.error('Erro ao buscar detalhes do Pokémon:', err);
    res.status(500).send('Erro ao buscar detalhes do Pokémon.');
  }
}


module.exports = {
  getPokemonsPage,
  pokemon_details,
};
