import async from 'async';
import User from '../models/user.model';
import Bcd from '../models/bcd.model';
import Tank from '../models/tank.model';
import Regulator from '../models/regulator.model';

export const emailExist = joi => ({
  name: 'email',
  base: joi.string().email(),
  language: {
    database: 'Database error : {{err}}',
    exists: '{{email}} already exist'
  },
  pre(value, state, options) {
    this._flags.exists = !!checkEmail(value);
    return value;
  },
  rules: [
    {
      name: 'exists',
      description: 'Email must not exists in database',
      validate(params, value, state, options) {
        if (this._flags.exists) {
          return this.createError('email.exists', { email: value}, state, options);
        }
        return value;
      }
    }
  ]
});
const findBcd = (number, callback) => {
  async.waterfall([
    function(next) {
      Bcd.findOne({number}).exec((err, result) => {
        next(err, result);
      });
    }
  ], callback);
};

export const numberExist = joi => ({
  name: 'bcd',
  base: joi.number(),
  language: {
    database: 'Database error : {{err}}',
    exists: 'bcd {{number}} already exist'
  },
  /*pre(value, state, options) {
    console.log('------ Coerce');
    this._flags.exists = false;
    findBcd(value, (err, result) => {
      if (err) return this.createError('bcd.database', { err }, state,options);
      if (result.number) this._flags.exists = result;
      return value;
    });
  },*/
  rules: [
    {
      name: 'exists',
      description: 'Email must not exists in database',
      validate(params, value, state, options) {
        return findBcd(value, (err, result) => {
          if (err) return this.createError('bcd.database', { err }, state,options);
          if (result.number) return this.createError('bcd.exists', { number: value }, state, options);
          if (!result) return value;
        });
        // return this.createError('bcd.database', {err: 'test'}, state, options);
      }
    }
  ]
});

/**
 * Check if number of type is already taken
 * @param type
 * @param number
 * @returns {Promise<*>}
 */
async function checkNumber(number) {
  try {
    /* const model = {
      'bcd': Bcd,
      'tank': Tank,
      'regulator': Regulator
    }; */
    return await Bcd.findOne({ number });
  }
  catch (err) {
    return err;
  }
}

/**
 * Check if user email is in DB
 * @param email
 * @returns {Promise<*>}
 */
async function checkEmail(email) {
  try {
    return await User.findOne({ email });
  }
  catch (err) {
    console.log(err);
  }
}
