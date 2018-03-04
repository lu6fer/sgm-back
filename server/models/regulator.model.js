import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const RegulatorSchema = new Schema({
  number: { type: 'Number', required: true, index: { unique: true } },
  brand: { type: 'String', required: true },
  description: { type: 'String', required: true },
  model: { type: 'String', required: true },
  usage: { type: 'String', required: true, default: 'Air', enum: ['Air', 'Nitrox', 'O2'] },
  serialNumber: {
    stage1: { type: 'String', required: true },
    stage2: { type: 'String' },
    stageOcto: { type: 'String', required: true }
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
RegulatorSchema.method({
});

/**
 * Statics
 */
RegulatorSchema.statics = {
  /**
   * Get Regulator
   * @param {integer} number - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(number) {
    return this.findOne({ number })
      .exec()
      .then((regulator) => {
        if (regulator) {
          return regulator;
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
 * @typedef Regulator
 */
export default mongoose.model('Regulator', RegulatorSchema);
