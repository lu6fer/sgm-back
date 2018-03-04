import Joi from 'joi';


export default {
  // POST /api/regulators
  createRegulator: {
    body: {
      number: Joi.number().required(),
      brand: Joi.string().required(),
      description: Joi.string().required(),
      model: Joi.string().required(),
      usage: Joi.any()
        .valid(['Air', 'Nitrox', 'O2'])
        .required(),
      serialNumber: Joi.object({
        stage1: Joi.string().required(),
        stage2: Joi.string(),
        stageOcto: Joi.string().required()
      }),
      buy: Joi.object({
        shop: Joi.string(),
        price: Joi.number(),
        date: Joi.date().iso()
      }),
      status: Joi.any()
        .valid([
          'En service', 'Réformé', 'Vendu',
          'Perdu', 'Disparu', 'Echangé',
          'Mis en vente', 'Résilié'
        ])
        .required(),
    }
  },

  // UPDATE /api/regulators/:regulatorNumber
  updateRegulator: {
    body: {
      number: Joi.number().required(),
      brand: Joi.string().required(),
      description: Joi.string().required(),
      model: Joi.string().required(),
      usage: Joi.any()
        .valid(['Air', 'Nitrox', 'O2'])
        .required(),
      serialNumber: Joi.object({
        stage1: Joi.string().required(),
        stage2: Joi.string(),
        stageOcto: Joi.string().required()
      }),
      buy: Joi.object({
        shop: Joi.string(),
        price: Joi.number(),
        date: Joi.date().iso()
      }),
      status: Joi.any()
        .valid([
          'En service', 'Réformé', 'Vendu',
          'Perdu', 'Disparu', 'Echangé',
          'Mis en vente', 'Résilié'
        ])
        .required(),
    },
    params: {
      regulatorNumber: Joi.number().required()
    }
  }
};
