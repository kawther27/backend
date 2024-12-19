import Joi from 'joi';

const validationRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    role_id: Joi.number().required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  
  next();
};

export default validationRegister;





