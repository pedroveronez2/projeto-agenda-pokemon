const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Rota de registro
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      req.flash('error', 'Usuário ou e-mail já existente.');
      return res.redirect('/register');
    }

    // Verificar o tamanho da senha (máximo 8 caracteres)
    if (password.length < 6 || password.length > 8) {
      req.flash('error', 'A senha deve ter entre 6 e 8 caracteres.');
      return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    req.flash('success', 'Registro realizado com sucesso! Faça login para continuar.');
    return res.redirect('/register');
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
    req.flash('error', 'Usuário não encontrado.');
    return res.redirect('/login');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    req.flash('error', 'Senha incorreta.');
    return res.redirect('/login');
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
