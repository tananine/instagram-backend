const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const User = require('./user.model')

const follower = sequelize.define('follower', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
})

module.exports = follower
