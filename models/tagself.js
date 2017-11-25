module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tagself', {
    parent: sequelize.STRING(10),
    child: sequelize.STRING(10),
  })
}