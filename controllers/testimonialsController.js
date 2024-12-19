import Testimonial from '../models/Testimonial.js';
import  validationTestimonial  from '../validations/validationTestimonial.js';

export const getTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.findAll();
      res.send(testimonials);
    } catch (err) {
      res.status(400).send(err);
    }
  };
export const createTestimonial = async (req, res) => {
  const { error } = validationTestimonial(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const testimonial = await Testimonial.create({
      user_id: req.user.id,
      content: req.body.content,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.send(testimonial);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateTestimonial = async (req, res) => {
  const { error } = validationTestimonial(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const testimonial = await Testimonial.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!testimonial) return res.status(404).send('Testimonial not found');

    testimonial.content = req.body.content;
    testimonial.updated_at = new Date();
    await testimonial.save();

    res.send(testimonial);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!testimonial) return res.status(404).send('Testimonial not found');

    await testimonial.destroy();
    res.send('Testimonial deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};

