module.exports = function (sequelize, DataTypes) {
  return sequelize.define('category', {
    name: {
      type: DataTypes.STRING(20),
      unique: true
    }
  })
}