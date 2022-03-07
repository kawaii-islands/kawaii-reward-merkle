const passport = require('passport');
const request = require('request');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { roleRights } = require('../config/roles');
const config = require('../config/config');

async function getUser(url, headers) {
  const options = {
    url,
    headers,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    request.get(options, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res.body));
      }
    });
  });
}

const auth = (...requiredRights) => async (req, res, next) => {
  let token = req.get('Authorization');
  token = token.replace('Bearer ', '');
  const secretKey = config.jwt.secret;
  try {
    res.tokenBody = jwt.verify(token, secretKey);
  } catch (e) {
    res.tokenBody = {};
  }
  return new Promise((resolve, reject) => {
    if (Object.keys(res.tokenBody).length === 0) {
      reject(new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid token'));
    }
    // if (res.tokenBody == {}) {
    //   reject(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token'));
    // }
    user = res.tokenBody;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every(requiredRight => userRights.includes(requiredRight));
      if (!hasRequiredRights) {
        return reject(new AppError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve();
  })
    .then(() => next())
    .catch(err => next(err));
};

module.exports = auth;
