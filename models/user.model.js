const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const user = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

module.exports = user
