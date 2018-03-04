import express from 'express';
import userRoutes from './user.route';
import bcdRoutes from './bcd.route';
import tankRoutes from './tank.route';
import regulatorRoutes from './regulator.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount bcd routes at /bcds
router.use('/bcds', bcdRoutes);

// mount tank routes at /tanks
router.use('/tanks', tankRoutes);

// mount regulator routes at /regulators
router.use('/regulators', regulatorRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
