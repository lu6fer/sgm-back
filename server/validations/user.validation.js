import Joi from 'joi';


export default {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      role: Joi.any().valid(['user', 'instructor', 'admin']),
      password: Joi.string(),
      membership: Joi.array().items(Joi.any().valid(['tank', 'regulator', 'bcd'])),
      rent: Joi.array()
    }
  },

  // UPDATE /api/users/:userSlug
  updateUser: {
    body: {
      email: Joi.string().email().required(),
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      role: Joi.any().valid(['user', 'instructor', 'admin']).required(),
      membership: Joi.array().items(Joi.any().valid(['tank', 'regulator', 'bcd'])).required(),
      rent: Joi.array().required()
    },
    params: {
      userSlug: Joi.string().required()
    }
  },

  // UPDATE password /api/users/password
  changePassword: {
    body: {
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password'))
    }
  }
};
