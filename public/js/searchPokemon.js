function searchPokemons() {
  // Declare variables
  var input, filter, ul, li, h5, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  pokemonList = document.getElementById("pokemonList");
  cards = pokemonList.getElementsByClassName('col-lg-4 col-md-6 col-sm-12 mb-4');

  // Loop through all cards, and hide those that don't match the search query
  for (let i = 0; i < cards.length; i++) {
    h5 = cards[i].querySelector('.card-title');
    txtValue = h5.textContent || h5.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "block"; // Altere o estilo para "block"
    } else {
      cards[i].style.display = "none";
    }
  }
}
