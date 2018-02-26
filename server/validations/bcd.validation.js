import Joi from 'joi';


export default {
  // POST /api/bcds
  createBcd: {
    body: {
      number: Joi.number().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      size: Joi.any().valid(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']).required(),
      buy: Joi.object({
        shop: Joi.string(),
        price: Joi.number(),
        date: Joi.date(),
      }),
      status: Joi.any().valid(['En service', 'Réformé', 'Vendu',
        'Perdu', 'Disparu', 'Echangé',
        'Mis en vente', 'Résilié'])
    }
  },

  // UPDATE /api/users/:userSlug
  updateBcd: {
    body: {
      number: Joi.number(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      size: Joi.any().valid(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']).required(),
      buy: Joi.object({
        shop: Joi.string(),
        price: Joi.number(),
        date: Joi.date().iso()
      }),
      status: Joi.any().valid(['En service', 'Réformé', 'Vendu',
        'Perdu', 'Disparu', 'Echangé',
        'Mis en vente', 'Résilié'])
    },
    params: {
      bcdNumber: Joi.number().required()
    }
  }
};
