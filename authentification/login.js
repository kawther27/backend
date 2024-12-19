import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/Role.js';
import { validationLogin } from '../validations/validationLogin.js';

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
