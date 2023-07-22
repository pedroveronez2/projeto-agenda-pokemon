const pokeapi = require('../config/pokeapi');

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



module.exports = {
  getPokemonsPage,
  
};
