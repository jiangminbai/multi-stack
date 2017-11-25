module.exports = function (sequelize, DataTypes) {
  return sequelize.define('article', {
    title: DataTypes.STRING(50),
    content: DataTypes.TEXT,
    pv: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1
    },
  })
}