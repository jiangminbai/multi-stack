module.exports = function (sequelize, DataTypes) {
  return sequelize.define('areply', {
    content: DataTypes.TEXT
  })
}