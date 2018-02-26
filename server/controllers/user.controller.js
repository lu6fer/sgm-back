import httpStatus from 'http-status';
import User from '../models/user.model';
import Config from '../../config/config';
import APIError from '../helpers/APIError';

/**
 * Load user and append to req.
 */
function load(req, res, next, slug) {
  User.get(slug)
    .then((user) => {
      if(!user) {
        const err = new APIError('not an endpoint', httpStatus.NOT_FOUND, true);
      }
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User(req.body);
  user.password = req.body.password || Config.defaultUserPassword;

  user.save()
    .then(saved => res.json({
      error: false,
      user: saved
    }))
    .catch(err => next(err));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  // Populate user
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.rent = req.body.rent;
  user.membership = req.body.membership;
  user.role = req.body.role;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

/**
 * Change user password
 * @param req
 * @param res
 * @param next
 */
function changePassword(req, res, next) {
  // find user from jwt payload
  User.findOne({ slug: req.user.slug })
    .then((data) => {
      const user = data;
      const err = new APIError('Invalid credentials', httpStatus.UNAUTHORIZED, true);
      if (!user) return next(err);
      // update password
      user.password = req.body.password;
      return user.save();
    })
    // return saved user
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));

  /* user.password = req.body.password;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));*/
}

export default { load, get, create, update, list, remove, changePassword };
