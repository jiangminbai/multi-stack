const { moment } = require('./util');

exports.fromNow = function(obj) {
  return moment(obj).fromNow();
}