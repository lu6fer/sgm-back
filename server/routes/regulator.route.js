import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import paramValidation from '../validations/regulator.validation';
import regulatorCtrl from '../controllers/regulator.controller';

const router = express.Router(); // eslint-disable-line new-cap

const validation = (req, res, next) => {
  Joi.validate(req.body, paramValidation.createRegulator.body,
    { abortEarly: false },
    (err, value) => {
      console.log(err);
      console.log(value);
      res.end();
  });
};

router.route('/')
/** GET /api/regulators - Get list of regulators */
  .get(regulatorCtrl.list)

  /** POST /api/regulators - Create new regulator */
  .post(validate(paramValidation.createRegulator), regulatorCtrl.create);
  //.post(validation, regulatorCtrl.create);

router.route('/:regulatorNumber')
/** GET /api/regulators/:regulatorNumber - Get regulator */
  .get(regulatorCtrl.get)

  /** PUT /api/regulators/:regulatorNumber - Update regulator */
  .put(validate(paramValidation.updateRegulator), regulatorCtrl.update)

  /** DELETE /api/regulators/:regulatorNumber - Delete regulator */
  .delete(regulatorCtrl.remove);


/** Load regulator when API with regulatorNumber route parameter is hit */
router.param('regulatorNumber', regulatorCtrl.load);

export default router;
