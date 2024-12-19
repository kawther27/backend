import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import validationLogin from '../validations/validationLogin.js';
import validationRegister from '../validations/validationRegister.js';

export const login = async (req, res) => {
  // Validate user
  const { error } = validationLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Email or password is wrong');

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ id: user.id, role: user.role_id }, process.env.CODE_SECRET);
  res.header('authorization', token).send(token);
};

export const register = async (req, res) => {
  // Validate user
  const { error } = validationRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email already exists
  const emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role_id: req.body.role_id
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
};
