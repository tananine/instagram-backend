const db = require('../models')

exports.getFeeds = (req, res, next) => {
  db.Post.findAll({
    include: [db.User, db.Photo, db.Comment, db.PostLike],
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.status(200).json({ posts: posts })
    })
    .catch((err) => {
      next(err)
    })
}
