import express from 'express';
import validate from 'express-validation';
import paramValidation from '../validations/bcd.validation';
import bcdCtrl from '../controllers/bcd.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/bcds - Get list of bcds */
  .get(bcdCtrl.list)

  /** POST /api/bcds - Create new bcd */
  .post(validate(paramValidation.createBcd), bcdCtrl.create);
// .post(valid, bcdCtrl.create);

router.route('/:bcdNumber')
/** GET /api/bcds/:bcdNumber - Get bcd */
  .get(bcdCtrl.get)

  /** PUT /api/bcds/:bcdNumber - Update bcd */
  .put(validate(paramValidation.updateBcd), bcdCtrl.update)

  /** DELETE /api/bcds/:bcdNumber - Delete bcd */
  .delete(bcdCtrl.remove);


/** Load bcd when API with bcdNumber route parameter is hit */
router.param('bcdNumber', bcdCtrl.load);

export default router;
