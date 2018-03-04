import express from 'express';
import validate from 'express-validation';
import paramValidation from '../validations/tank.validation';
import tankCtrl from '../controllers/tank.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/tanks - Get list of tanks */
  .get(tankCtrl.list)

  /** POST /api/tanks - Create new tank */
  .post(validate(paramValidation.createTank), tankCtrl.create);
// .post(valid, tankCtrl.create);

router.route('/:tankNumber')
/** GET /api/tanks/:tankNumber - Get tank */
  .get(tankCtrl.get)

  /** PUT /api/tanks/:tankNumber - Update tank */
  .put(validate(paramValidation.updateTank), tankCtrl.update)

  /** DELETE /api/tanks/:tankNumber - Delete tank */
  .delete(tankCtrl.remove);


/** Load tank when API with tankNumber route parameter is hit */
router.param('tankNumber', tankCtrl.load);

export default router;
