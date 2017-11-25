module.exports = function (sequelize, DataTypes) {
  return sequelize.define('category', {
    name: DataTypes.STRING(20),
  })
}