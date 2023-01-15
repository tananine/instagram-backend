const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const comment = sequelize.define('comment', {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isReply: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

module.exports = comment
