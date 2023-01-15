const sequelize = require('../utils/dbConnect')

const db = {}

db.sequelize = sequelize

db.User = require('./user.model')
db.Post = require('./post.model')
db.Photo = require('./photo.model')
db.Comment = require('./comment.model')
db.Follower = require('./follower.model')
db.Reply = require('./reply.model')
db.PostLike = require('./post-like.model')
db.CommentLike = require('./comment-like.model')

db.User.hasMany(db.Post, { foreignKey: { allowNull: false } })
db.Post.belongsTo(db.User)

db.Post.hasMany(db.Photo, { foreignKey: { allowNull: false } })
db.Photo.belongsTo(db.Post)

db.Post.hasMany(db.Comment, { foreignKey: { allowNull: false } })
db.Comment.belongsTo(db.Post)

db.User.hasMany(db.Comment, { foreignKey: { allowNull: false } })
db.Comment.belongsTo(db.User)

db.User.belongsToMany(db.Post, { through: db.PostLike })
db.Post.belongsToMany(db.User, { through: db.PostLike })
db.User.hasMany(db.PostLike, { foreignKey: { allowNull: false } })
db.PostLike.belongsTo(db.User)
db.Post.hasMany(db.PostLike, { foreignKey: { allowNull: false } })
db.PostLike.belongsTo(db.Post)

db.User.belongsToMany(db.Comment, { through: db.CommentLike })
db.Comment.belongsToMany(db.User, { through: db.CommentLike })
db.User.hasMany(db.CommentLike, { foreignKey: { allowNull: false } })
db.CommentLike.belongsTo(db.User)
db.Comment.hasMany(db.CommentLike, { foreignKey: { allowNull: false } })
db.CommentLike.belongsTo(db.Comment)

db.User.hasMany(db.Follower, { foreignKey: { allowNull: false } })
db.Follower.belongsTo(db.User)

db.Comment.hasMany(db.Reply, { foreignKey: { allowNull: false } })
db.Reply.belongsTo(db.Comment)

module.exports = db
