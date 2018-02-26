import httpStatus from 'http-status';
import Bcd from '../models/bcd.model';
import APIError from '../helpers/APIError';

/**
 * Load bcd and append to req.
 */
function load(req, res, next, number) {
  Bcd.get(number)
    .then((bcd) => {
      if (!bcd) {
        const err = new APIError('Not an endpoint', httpStatus.NOT_FOUND, true);
        return next(err);
      }
      req.bcd = bcd; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get bcd
 * @returns {Bcd}
 */
function get(req, res) {
  return res.json(req.bcd);
}

/**
 * Create new bcd
 * @property {string} req.body.bcdname - The bcdname of bcd.
 * @property {string} req.body.mobileNumber - The mobileNumber of bcd.
 * @returns {Bcd}
 */
function create(req, res, next) {
  Bcd.findOne({ number: req.body.number })
    .then((bcd) => {
      if (bcd) {
        const err = new APIError(`Bcd number ${bcd.number} already exist`, httpStatus.CONFLICT, true);
        return next(err);
      }
      const newBcd = new Bcd(req.body);
      return newBcd.save();
    })
    .then(saved => res.json(saved))
    .catch(err => next(err));
}

/**
 * Update existing bcd
 * @property {string} req.body.bcdname - The bcdname of bcd.
 * @property {string} req.body.mobileNumber - The mobileNumber of bcd.
 * @returns {Bcd}
 */
function update(req, res, next) {
  if (req.body.number !== req.param.bcdNumber) {
    const err = new APIError('Parameters mismatch', httpStatus.CONFLICT, true);
    return next(err);
  }

  const bcd = req.bcd;
  // Populate bcd
  bcd.number = req.body.number;
  bcd.brand = req.body.brand;
  bcd.model = req.body.model;
  bcd.size = req.body.size;
  bcd.buy.shop = req.body.buy.shop;
  bcd.buy.price = req.body.buy.price;
  bcd.buy.date = req.body.buy.data;
  bcd.status = req.body.status;

  bcd.save()
    .then(savedBcd => res.json(savedBcd))
    .catch(e => next(e));
}

/**
 * Get bcd list.
 * @property {number} req.query.skip - Number of bcds to be skipped.
 * @property {number} req.query.limit - Limit number of bcds to be returned.
 * @returns {Bcd[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Bcd.list({ limit, skip })
    .then(bcds => res.json(bcds))
    .catch(e => next(e));
}

/**
 * Delete bcd.
 * @returns {Bcd}
 */
function remove(req, res, next) {
  const bcd = req.bcd;
  bcd.remove()
    .then(deletedBcd => res.json(deletedBcd))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
