import httpStatus from 'http-status';
import Regulator from '../models/regulator.model';
import APIError from '../helpers/APIError';

/**
 * Load regulator and append to req.
 */
function load(req, res, next, number) {
  Regulator.get(number)
    .then((regulator) => {
      if (!regulator) {
        const err = new APIError('Not an endpoint', httpStatus.NOT_FOUND, true);
        return next(err);
      }
      req.regulator = regulator; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get regulator
 * @returns {Regulator}
 */
function get(req, res) {
  return res.json(req.regulator);
}

/**
 * Create new regulator
 * @property {string} req.body.regulatorname - The regulatorname of regulator.
 * @property {string} req.body.mobileNumber - The mobileNumber of regulator.
 * @returns {Regulator}
 */
function create(req, res, next) {
  Regulator.findOne({ number: req.body.number })
    .then((regulator) => {
      if (regulator) {
        const err = new APIError(`Regulator number ${regulator.number} already exist`, httpStatus.CONFLICT, true);
        return next(err);
      }
      const newRegulator = new Regulator(req.body);
      return newRegulator.save();
    })
    .then(saved => res.json(saved))
    .catch(err => next(err));
}

/**
 * Update existing regulator
 * @property {string} req.body.regulatorname - The regulatorname of regulator.
 * @property {string} req.body.mobileNumber - The mobileNumber of regulator.
 * @returns {Regulator}
 */
function update(req, res, next) {
  if (req.body.number !== req.param.regulatorNumber) {
    const err = new APIError('Parameters mismatch', httpStatus.CONFLICT, true);
    return next(err);
  }

  const regulator = req.regulator;
  // Populate regulator
  regulator.number = req.body.number;
  regulator.brand = req.body.brand;
  regulator.model = req.body.model;
  regulator.size = req.body.size;
  regulator.buy.shop = req.body.buy.shop;
  regulator.buy.price = req.body.buy.price;
  regulator.buy.date = req.body.buy.data;
  regulator.status = req.body.status;

  regulator.save()
    .then(savedRegulator => res.json(savedRegulator))
    .catch(e => next(e));
}

/**
 * Get regulator list.
 * @property {number} req.query.skip - Number of regulators to be skipped.
 * @property {number} req.query.limit - Limit number of regulators to be returned.
 * @returns {Regulator[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Regulator.list({ limit, skip })
    .then(regulators => res.json(regulators))
    .catch(e => next(e));
}

/**
 * Delete regulator.
 * @returns {Regulator}
 */
function remove(req, res, next) {
  const regulator = req.regulator;
  regulator.remove()
    .then(deletedRegulator => res.json(deletedRegulator))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
