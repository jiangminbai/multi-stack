const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
let moment = require('moment');
moment.locale('zh-cn');

let marked = require('marked');
let highlight = require('highlight.js');
marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
})

exports.createSha1 = function (text) {
  let sha1 = crypto.createHash('sha1');
  sha1.update(text);
  return sha1.digest('hex');
}

exports.validateName = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
}

exports.hash = function(password, salt) {
  const passhash = bcryptjs.hashSync(password, salt || 10);
  return passhash;
}

exports.compareHash = function(password, passhash) {
  return bcryptjs.compareSync(password, passhash);
}

exports.marked = marked;

exports.moment = moment;