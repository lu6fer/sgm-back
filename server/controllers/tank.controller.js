import httpStatus from 'http-status';
import Tank from '../models/tank.model';
import APIError from '../helpers/APIError';

/**
 * Load tank and append to req.
 */
function load(req, res, next, number) {
  Tank.get(number)
    .then((tank) => {
      if (!tank) {
        const err = new APIError('Not an endpoint', httpStatus.NOT_FOUND, true);
        return next(err);
      }
      req.tank = tank; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get tank
 * @returns {Tank}
 */
function get(req, res) {
  return res.json(req.tank);
}

/**
 * Create new tank
 * @property {string} req.body.tankname - The tankname of tank.
 * @property {string} req.body.mobileNumber - The mobileNumber of tank.
 * @returns {Tank}
 */
function create(req, res, next) {
  Tank.findOne({ number: req.body.number })
    .then((tank) => {
      if (tank) {
        const err = new APIError(`Tank number ${tank.number} already exist`, httpStatus.CONFLICT, true);
        return next(err);
      }
      const newTank = new Tank(req.body);
      return newTank.save();
    })
    .then(saved => res.json(saved))
    .catch(err => next(err));
}

/**
 * Update existing tank
 * @property {string} req.body.tankname - The tankname of tank.
 * @property {string} req.body.mobileNumber - The mobileNumber of tank.
 * @returns {Tank}
 */
function update(req, res, next) {
  if (req.body.number !== req.param.tankNumber) {
    const err = new APIError('Parameters mismatch', httpStatus.CONFLICT, true);
    return next(err);
  }

  const tank = req.tank;
  // Populate tank
  tank.number = req.body.number;
  tank.brand = req.body.brand;
  tank.model = req.body.model;
  tank.size = req.body.size;
  tank.buy.shop = req.body.buy.shop;
  tank.buy.price = req.body.buy.price;
  tank.buy.date = req.body.buy.data;
  tank.status = req.body.status;

  tank.save()
    .then(savedTank => res.json(savedTank))
    .catch(e => next(e));
}

/**
 * Get tank list.
 * @property {number} req.query.skip - Number of tanks to be skipped.
 * @property {number} req.query.limit - Limit number of tanks to be returned.
 * @returns {Tank[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Tank.list({ limit, skip })
    .then(tanks => res.json(tanks))
    .catch(e => next(e));
}

/**
 * Delete tank.
 * @returns {Tank}
 */
function remove(req, res, next) {
  const tank = req.tank;
  tank.remove()
    .then(deletedTank => res.json(deletedTank))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
