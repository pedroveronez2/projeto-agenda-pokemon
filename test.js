const axios = require('axios');

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
    console.log(pokemonList[0].name)

    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
}

getRandomPokemonData()