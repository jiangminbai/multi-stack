module.exports = function (sequelize, DataTypes) {
  return sequelize.define('treply', {
    content: DataTypes.TEXT
  })
}