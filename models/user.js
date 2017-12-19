module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    nickname: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    retrieve_key: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    retrieve_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })
}