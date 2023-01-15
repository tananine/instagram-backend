const sequelize = require('../utils/dbConnect')

const postLike = sequelize.define('postLike', {})

module.exports = postLike
