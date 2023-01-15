const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const photo = sequelize.define('photo', {
  file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = photo
