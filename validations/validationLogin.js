import Joi from 'joi';

const validationLogin = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    next(); 
  } catch (err) {
    console.error('Validation error:', err); // Debugging log
    res.status(500).json({ message: 'Server error during validation.' });
  }
};

export default validationLogin;
