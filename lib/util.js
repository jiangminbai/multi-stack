const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

exports.createSha1 = function (text) {
  let sha1 = crypto.createHash('sha1');
  sha1.update(text);
  return sha1.digest('hex');
}

exports.validateName = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
}

exports.hash = function (str, salt) {
  salt = salt || 10;
  return new Promise((resolve, reject) => {
    bcryptjs.hash(str, salt, (err, hashStr) => {
      if (err) return reject(err);
      resolve(hashStr);
    })
  })
}