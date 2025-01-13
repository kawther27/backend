import Testimonial from '../models/Testimonial.js';
import validationTestimonial from '../validations/validationTestimonial.js';

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching testimonials', error: err });
  }
};

// Create a testimonial
export const createTestimonial = async (req, res) => {
  const { error } = validationTestimonial(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  console.log('User from token:', req.user);

  try {
      // Validate if the user exists
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Create the testimonial
      const testimonial = await Testimonial.create({
          user_id: req.user.id,
          content: req.body.content,
          created_at: new Date(),
          updated_at: new Date(),
      });

      res.status(201).json(testimonial);
  }catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ message: 'Error creating testimonial', error: err.message || err });
}

};

// Update a testimonial
export const updateTestimonial = async (req, res) => {
  const { error } = validationTestimonial(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const testimonial = await Testimonial.findOne({
      where: { id: req.params.id, user_id: req.user.id }, // Validate user ownership
    });

    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    testimonial.content = req.body.content;
    testimonial.updated_at = new Date();
    await testimonial.save();

    res.status(200).json({ message: 'Testimonial updated', testimonial });
  } catch (err) {
    res.status(500).json({ message: 'Error updating testimonial', error: err });
  }
};

// Delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({
      where: { id: req.params.id, user_id: req.user.id }, // Validate user ownership
    });

    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    await testimonial.destroy();
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting testimonial', error: err });
  }
};
