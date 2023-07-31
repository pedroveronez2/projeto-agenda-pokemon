// config/pokeapi.js
const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';

// Função para obter todos os 151 Pokémons
const getAllPokemons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
    return response.data.results;
  } catch (err) {
    console.error('Erro ao buscar os Pokémons:', err);
    throw err;
  }
};

// Função para obter detalhes de um Pokémon pelo nome
const getPokemonDetails = async (pokemonName) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
    const { id, name, sprites, types, abilities } = response.data;

    return {
      id,
      name,
      images: {
        imageFront: sprites.front_default,
        imageBack: sprites.back_default,
        imageAnimatedFront: sprites.versions['generation-v']['black-white'].animated.front_default,
        imageAnimatedBack: sprites.versions['generation-v']['black-white'].animated.back_default,
      },
      abilities: abilities.map(ability => ability.ability.name),
      types: types.map(type => type.type.name),
    };
  } catch (err) {
    console.error(`Erro ao buscar detalhes do Pokémon "${pokemonName}":`, err);
    throw err;
  }
};


module.exports = {
  getAllPokemons,
  getPokemonDetails,
};
