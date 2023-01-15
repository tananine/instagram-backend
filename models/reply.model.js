const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Comment = require('./comment.model')

const reply = sequelize.define('reply', {
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Comment,
      key: 'id',
    },
  },
  replyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Comment,
      key: 'id',
    },
  },
})

module.exports = reply
