import Joi from 'joi';

const registrationSchema = Joi.object({
  universityName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  universityType: Joi.string().valid('public', 'private').required(),
  location: Joi.string().required(),
});

export const validateRegistration = (data) => {
  return registrationSchema.validate(data);
};


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const  validateLogin =(data) => {
    return loginSchema.validate(data);
}

