module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tag', {
    name: DataTypes.STRING(10)
  })
}