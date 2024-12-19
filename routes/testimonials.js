import express from 'express';
import {
     getTestimonials,
     createTestimonial,
     updateTestimonial, 
     deleteTestimonial } 
     from '../controllers/testimonialsController.js';
import verifyToken from '../authentification/verifierToken.js';

const router = express.Router();

router.get('/', verifyToken, getTestimonials);
router.post('/', verifyToken, createTestimonial);
router.put('/:id', verifyToken, updateTestimonial);
router.delete('/:id', verifyToken, deleteTestimonial);

export default router;




