import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const TankSchema = new Schema({
  number: { type: 'Number', required: true, index: { unique: true } },
  cylinder: {
    brand: { type: 'String', required: true },
    maker: { type: 'String', required: true },
    model: { type: 'String', required: true },
    size: { type: 'String', required: true },
    serialNumber: { type: 'String', required: true },
    threadType: { type: 'String', required: true },
    pressure: {
      operating: { type: 'Number', required: true },
      test: { type: 'Number', required: true },
    }
  },
  valve: {
    model: { type: 'String' },
    brand: { type: 'String', required: true },
    serialNumber: { type: 'String', required: true }
  },
  buy: {
    shop: { type: 'String' },
    price: { type: 'Number' },
    date: { type: 'Date' }
  },
  status: {
    type: 'String',
    required: true,
    default: 'En Service',
    enum: [
      'En service', 'Réformé', 'Vendu',
      'Perdu', 'Disparu', 'Echangé',
      'Mis en vente', 'Résilié'
    ] },
  usage: { type: 'String', enum: ['Air', 'Nitrox', 'O2'], default: 'Air' }
}, {
  timestamps: true
});
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TankSchema.method({
});

/**
 * Statics
 */
TankSchema.statics = {
  /**
   * Get user
   * @param {integer} number - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(number) {
    return this.findOne({ number })
      .exec()
      .then((tank) => {
        if (tank) {
          return tank;
        }
        const err = new APIError('Not an endpoint', httpStatus.NOT_FOUND);
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
};

/**
 * @typedef Tank
 */
export default mongoose.model('Tank', TankSchema);

