import Joi from 'joi';


export default {
  // POST /api/tanks
  createTank: {
    body: {
      number: Joi.number()
        .required(),
      cylinder: Joi.object({
        brand: Joi.string()
          .required(),
        maker: Joi.string()
          .required(),
        model: Joi.string()
          .required(),
        size: Joi.string()
          .required(),
        serialNumber: Joi.string()
          .required(),
        threadType: Joi.string()
          .required(),
        pressure: Joi.object({
          operating: Joi.number()
            .required(),
          test: Joi.number()
            .required(),
        })
      }),
      valve: Joi.object({
        model: Joi.string(),
        brand: Joi.string()
          .required(),
        serialNumber: Joi.string()
          .required()
      }),
      buy: Joi.object({
        shop: Joi.string(),
        price: Joi.number(),
        date: Joi.date()
          .iso()
      }),
      status: Joi.any()
        .valid([
          'En service', 'Réformé', 'Vendu',
          'Perdu', 'Disparu', 'Echangé',
          'Mis en vente', 'Résilié'
        ])
        .required(),
      usage: Joi.any()
        .valid(['Air', 'Nitrox', 'O2'])
        .required(),
    }
  },

  // UPDATE /api/tanks/:tankNumber
  updateTank: {
    body: {
      number: Joi.number()
        .required(),
      cylinder: Joi.object({
        brand: Joi.string()
          .required(),
        maker: Joi.string()
          .required(),
        model: Joi.string()
          .required(),
        size: Joi.string()
          .required(),
        serialNumber: Joi.string()
          .required(),
        threadType: Joi.string()
          .required(),
        pressure: Joi.object({
          operating: Joi.number()
            .required(),
          test: Joi.number()
            .required(),
        })
      }),
      valve: Joi.object({
        model: Joi.string(),
        brand: Joi.string()
          .required(),
        serialNumber: Joi.string()
          .required()
      }),
      buy: Joi.object({
        shop: Joi.string(),
        price: Joi.number(),
        date: Joi.date()
          .iso()
      }),
      status: Joi.any()
        .valid([
          'En service', 'Réformé', 'Vendu',
          'Perdu', 'Disparu', 'Echangé',
          'Mis en vente', 'Résilié'
        ])
        .required(),
      usage: Joi.any()
        .valid(['Air', 'Nitrox', 'O2'])
        .required(),
    },
    params: {
      tankNumber: Joi.number().required()
    }
  }
};
