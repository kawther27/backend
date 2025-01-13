import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import verifyToken from '../authentification/verifierToken.js';
// import authorizeRole from '../authentification/autorisation.js'; // Optional if role-based access is required.

const router = express.Router();

// Route to get all users (requires authentication)
router.get('/', verifyToken, getAllUsers);

// Route to get a user by ID (requires authentication)
router.get('/:id', verifyToken, getUserById);

// Route to update a user by ID (requires authentication)
router.put('/:id', verifyToken, updateUser);

// Route to delete a user by ID (requires authentication)
router.delete('/:id', verifyToken, deleteUser);

export default router;
