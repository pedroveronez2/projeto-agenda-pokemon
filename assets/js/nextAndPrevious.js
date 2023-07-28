   // Definir uma variável global currentIndex para rastrear o índice do Pokémon atual
    let currentIndex = 0;
  
    // Função para mostrar o Pokémon atual
    function showCurrentPokemon() {
      const favoritePokemon = document.querySelector('.favorite-pokemon');
      if (user.team.length === 0) {
        favoritePokemon.innerHTML = '<h2>Nenhum Pokémon favorito encontrado.</h2>';
      } else {
        favoritePokemon.innerHTML = `
          <h2>${user.team[currentIndex].name}</h2>
          <button class="btn btn-primary" onclick="previousPokemon()">Anterior</button>
          <button class="btn btn-primary" onclick="nextPokemon()">Próximo</button>
        `;
      }
    }
  
    // Função para mostrar o próximo Pokémon favorito
    function nextPokemon() {
      if (user.team.length > 0) {
        currentIndex = (currentIndex + 1) % user.team.length;
        showCurrentPokemon();
      }
    }
  
    // Função para mostrar o Pokémon anterior favorito
    function previousPokemon() {
      if (user.team.length > 0) {
        currentIndex = (currentIndex - 1 + user.team.length) % user.team.length;
        showCurrentPokemon();
      }
    }
  
    // Chame a função showCurrentPokemon() para exibir o Pokémon favorito atual
    showCurrentPokemon();