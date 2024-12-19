import Joi from 'joi';

const validationTestimonial = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).required()
  });

  return schema.validate(data);
};

export default validationTestimonial;


