const sequelize = require('../utils/dbConnect')

const commentLike = sequelize.define('commentLike', {})

module.exports = commentLike
