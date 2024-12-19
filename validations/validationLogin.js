import Joi from 'joi';

const validationLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  
  next();
};

export default validationLogin;




