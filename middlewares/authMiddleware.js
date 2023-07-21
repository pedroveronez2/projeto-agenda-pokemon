const isLoggedIn = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  };
  
  const checkFavoritesLimit = (req, res, next) => {
    if (res.locals.user && res.locals.user.favorites.length >= 4) {
      req.flash('error', 'Você já possui o limite máximo de Pokémons favoritos (4).');
      return res.redirect('/pokemons');
    }
    next();
  };
  
  const error404 = (req, res) => {
    res.status(404).render('404');
  };
  
  module.exports = {
    isLoggedIn,
    checkFavoritesLimit,
    error404,
  };
  