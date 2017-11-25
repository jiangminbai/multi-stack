module.exports = function (sequelize, DataTypes) {
  return sequelize.define('acomment', {
    content: DataTypes.TEXT
  })
}