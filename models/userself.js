module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userself', {
    following: {
      type: DataTypes.INTEGER,
    },
    followed: {
      type: DataTypes.INTEGER,
    },
  })
}