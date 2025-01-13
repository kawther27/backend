import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const emailExists = await User.findOne({ where: { email: req.body.email } });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role_id: req.body.role_id || 1,
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: 'Error during registration', error: err.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.CODE_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};
