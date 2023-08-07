const pokeapi = require('../config/pokeapi');
const axios = require('axios');
const User = require('../models/user');

const index = async (req, res) => {
    try {
        
        const user = await User.findById(req.session.user?._id);
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // 
        const pokemonList = [];
        const numberOfPokemons = 2;
        const maxPokemonId = 151;
        for (let i = 0; i < numberOfPokemons; i++) {
            const randomPokemonId = Math.floor(Math.random() * maxPokemonId) + 1;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
            const pokemon = response.data;
      
            const abilities = pokemon.abilities.map(ability => ability.ability.name);
            const id = pokemon.id
            const pokemonData = {
              id,
              name: pokemon.name,
              image: pokemon.sprites.front_default, // Use sprites.front_default para uma imagem PNG estática
              gifImage: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default, // URL para a imagem GIF animada
              abilities: abilities,
            };
      
            pokemonList.push(pokemonData);
          }
        // 
        res.render('battlePokemon', { user, currentIndex: 0, enemyTeam: pokemonList })
    } catch (error) {
        res.status(500).send('Erro ao buscar uma batalha.');
        console.log(error)
    }

}

module.exports = {
    index
}