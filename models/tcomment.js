module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tcomment', {
    content: DataTypes.TEXT
  })
}