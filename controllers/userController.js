import User from '../models/user.js';
import validationRegister from '../validations/validationRegister.js';
import validationLogin from '../validations/validationLogin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Inscription d'un utilisateur
export const registerUser = async (req, res) => {
  const { error } = validationRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role_id: 1 // Rôle par défaut
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Connexion d'un utilisateur
export const loginUser = async (req, res) => {
  const { error } = validationLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ id: user.id }, process.env.CODE_SECRET);
  res.header('authorization', token).send(token);
};
