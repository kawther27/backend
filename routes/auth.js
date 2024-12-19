// auth.js
import express from 'express';
import { login, register } from '../controllers/authController.js';
import validationRegister from '../validations/validationRegister.js';
import validationLogin from '../validations/validationLogin.js';

const router = express.Router();

router.post('/register', validationRegister, register);
router.post('/login', validationLogin, login);

export default router;



