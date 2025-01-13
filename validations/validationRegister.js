import Joi from 'joi';

const validationRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    role_id:Joi.number().integer().min(1).max(10).optional(),


  });

  const { error } = schema.validate(req.body);
//Validates req.body and returns a 400 response for invalid input.
  if (error) {
    console.log('Validation Error:', error.details); // Debugging the validation error details

    return res.status(400).json({ message: error.details[0].message });
  }

  next(); // Pass control to the next middleware/controller if validation passes.
};

export default validationRegister;
