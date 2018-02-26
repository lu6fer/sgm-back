import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt-nodejs';
import slug from 'limax';
import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: 'String', required: true, index: { unique: true } },
  slug: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  role: { type: 'String', required: true, enum: ['user', 'instructor', 'admin'], default: 'user' },
  password: { type: 'String', required: true },
  membership: [],
  rent: []
}, {
  timestamps: true
});

UserSchema.method({
  /**
   * Generate password bcrypt hash
   * @param password
   * @returns {*}
   */
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  /**
   * Check if password match
   * @param password
   * @returns {*}
   */
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
});

UserSchema.static({
  /**
   * Get user
   * @param {string} slug - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(slug) {
    return this.findOne({ slug })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
});

/**
 * Pre validate hook
 */
UserSchema.pre('validate', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  }

  if (this.isModified('lastName') || this.isModified('firstName')) {
    this.slug = slug(`${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`);
  }

  return next();
});

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
