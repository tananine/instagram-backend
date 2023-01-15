const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const post = sequelize.define('post', {
  caption: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
})

module.exports = post
