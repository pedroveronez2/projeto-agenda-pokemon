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
const getRandomPokemonData =  async () => {
  const pokemonList = [];
  const numberOfPokemons = 4;

  try {
    const maxPokemonId = 151;

    for (let i = 0; i < numberOfPokemons; i++) {
      const randomPokemonId = Math.floor(Math.random() * maxPokemonId) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      const pokemon = response.data;

      const abilities = pokemon.abilities.map(ability => ability.ability.name);

      const pokemonData = {
        name: pokemon.name,
        image: pokemon.sprites.front_default, // Use sprites.front_default para uma imagem PNG estática
        gifImage: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default, // URL para a imagem GIF animada
        abilities: abilities,
      };

      pokemonList.push(pokemonData);
    }
    console.log(pokemonList)

    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
}
// const getPokemonDetails = async (pokemonName) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
//     const { id, name, sprites, types, abilities } = response.data;

//     // Obtém o HP do Pokémon de outro endpoint
//     const hpResponse = await axios.get(`${BASE_URL}/pokemon/${id}`);
//     const hp = hpResponse.data.stats.find(stat => stat.stat.name === "hp").base_stat;

//     // Obtém a descrição do Pokémon de outro endpoint (espécie)
//     const speciesResponse = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
//     const descriptionEntry = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === "en");
//     const description = descriptionEntry ? descriptionEntry.flavor_text : "";

//     // Obter descrições das habilidades do Pokémon
//     const abilitiesPromises = abilities.map(ability => axios.get(ability.ability.url));
//     const abilitiesResponses = await Promise.all(abilitiesPromises);
//     const abilityDescriptions = abilitiesResponses.map(res => res.data.effect_entries.find(entry => entry.language.name === "en").effect);

//     return {
//       id,
//       name,
//       hp,
//       description,
//       images: {
//         imageFront: sprites.front_default,
//         imageBack: sprites.back_default,
//         imageAnimatedFront: sprites.versions['generation-v']['black-white'].animated.front_default,
//         imageAnimatedBack: sprites.versions['generation-v']['black-white'].animated.back_default,
//       },
//       abilities: abilities.map((ability, index) => ({
//         name: ability.ability.name,
//         description: abilityDescriptions[index],
//       })),
//       types: types.map(type => type.type.name),
//     };
//   } catch (err) {
//     console.error(`Erro ao buscar detalhes do Pokémon "${pokemonName}":`, err);
//     throw err;
//   }
// };

module.exports = {
  getAllPokemons,
  getPokemonDetails,
  getRandomPokemonData,
};
