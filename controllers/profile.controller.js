const db = require('../models')

exports.getNavProfile = (req, res, next) => {
  db.User.findOne({ where: { id: req.user.userId } })
    .then((user) => {
      res.status(200).json({ user: user })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getProfile = async (req, res, next) => {
  const post = await db.Post.findAll({
    where: { userId: req.body.userId },
    include: [db.Photo, db.PostLike],
    order: [['createdAt', 'DESC']],
  }).catch((err) => next(err))
  const user = await db.User.findOne({
    where: { id: req.body.userId },
  }).catch((err) => next(err))
  const follower = await db.Follower.count({
    where: { followerId: req.body.userId },
  }).catch((err) => next(err))
  const meFollower = await db.Follower.count({
    where: { userId: req.body.userId },
  }).catch((err) => next(err))
  res.status(200).json({
    user: user,
    post: post,
    follower: follower,
    meFollower: meFollower,
  })
}

exports.follow = (req, res, next) => {
  const userId = req.body.userId
  db.Follower.findOne({
    where: { userId: req.user.userId, followerId: userId },
  })
    .then((follow) => {
      if (!follow) {
        db.Follower.create({
          userId: req.user.userId,
          followerId: userId,
        }).then(() => {
          res.status(200).json({ message: 'follow success.' })
        })
      } else {
        db.Follower.destroy({
          where: { userId: req.user.userId, followerId: userId },
        }).then(() => {
          res.status(200).json({ message: 'unfollow success.' })
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}

exports.getLike = (req, res, next) => {
  const userId = req.user.userId
  db.PostLike.findAll({ where: { userId: userId } })
    .then((item) => {
      const mapItem = item.map((e) => {
        return e.postId
      })
      res.status(200).json({ item: mapItem })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getFollower = (req, res, next) => {
  db.User.findAll({
    where: { id: req.user.userId },
    include: db.Follower,
  }).then((user) => {
    const follow = user[0].dataValues.followers.map((item) => {
      return item.dataValues.followerId
    })
    res.status(200).json({ follow: follow })
  })
}
