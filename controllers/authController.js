const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Rota de registro
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar se o campo de e-mail está presente
    if (!email) {
      const errorMessage = 'O campo de e-mail é obrigatório.';
      return res.render('register', { errorMessage });
    }

    // Verificar se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      req.flash('error', 'Usuário ou e-mail já existente.');
      const errorMessage = 'Usuário ou e-mail já existente.';
      return res.render('register', { errorMessage });
    }

    // Verificar o tamanho da senha (máximo 8 caracteres)
    if (password.length < 6 || password.length > 8) {
      req.flash('error', 'A senha deve ter entre 6 e 8 caracteres.');
      const errorMessage = 'A senha deve ter entre 6 e 8 caracteres.';
      return res.render('register', { errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    req.flash('success', 'Registro realizado com sucesso! Faça login para continuar.');
    res.render('register', {messageSuccess: 'Registro realizado com sucesso! Faça login para continuar.'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao registrar o usuário.');
  }
};

// Rota de login
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const errorMessage = 'Usuário não encontrado.';
    return res.render('login', { errorMessage });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const errorMessage = 'Senha incorreta.';
    return res.render('login', { errorMessage });
  }

  req.session.user = user;
  res.redirect('/dashboard');
};

// Rota de logout
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports = {
  register,
  login,
  logout,
};
