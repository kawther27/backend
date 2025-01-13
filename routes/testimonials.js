import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialsController.js';
import verifyToken from '../authentification/verifierToken.js';

const router = express.Router();

// Define routes
router.get('/', verifyToken, getTestimonials); // Get all testimonials
router.post('/', verifyToken, createTestimonial); // Create a testimonial
router.put('/:id', verifyToken, updateTestimonial); // Update a testimonial
router.delete('/:id', verifyToken, deleteTestimonial); // Delete a testimonial

export default router;
