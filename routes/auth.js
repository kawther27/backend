import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import validationRegister from '../validations/validationRegister.js';

const router = express.Router();

// Apply validation middleware before the controller
router.post('/register', validationRegister, registerUser);
router.post('/login', loginUser);

export default router;
