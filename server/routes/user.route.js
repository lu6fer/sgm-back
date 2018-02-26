import express from 'express';
import validate from 'express-validation';
import paramValidation from '../validations/user.validation';
import userCtrl from '../controllers/user.controller';
import config from '../../config/config';
import expressJwt from 'express-jwt/lib/index';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);
  // .post(valid, userCtrl.create);

router.route('/:userSlug')
  /** GET /api/users/:userSlug - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userSlug - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userSlug - Delete user */
  .delete(userCtrl.remove);

router.route('/password')
  /** PATCH /api/users/:userSlug/password - Update user password */
    .patch(expressJwt({ secret: config.jwtSecret }), validate(paramValidation.changePassword), userCtrl.changePassword);

/** Load user when API with userId route parameter is hit */
router.param('userSlug', userCtrl.load);

export default router;
