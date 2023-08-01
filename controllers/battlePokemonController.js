const pokeapi = require('../config/pokeapi');
const User = require('../models/user');

const index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user?._id);
        if (!req.session.user) {
            return res.redirect('/login');
        }


        res.render('battlePokemon', { user, currentIndex: 0 })
    } catch (error) {
        res.status(500).send('Erro ao buscar uma batalha.');

    }

}

module.exports = {
    index
}