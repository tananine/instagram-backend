const db = require('../models')

exports.create = (req, res, next) => {
  if (!req.files.length) {
    const error = new Error('no image provided.')
    error.statusCode = 401
    throw error
  }
  const media = req.files
  const caption = req.body.caption
  const photos = []
  media.forEach((e) => {
    photos.push({ file: e.path })
  })
  db.Post.create(
    {
      userId: req.user.userId,
      caption: caption,
      photos: [...photos],
    },
    {
      include: [db.Photo],
    }
  )
    .then(() => {
      res.status(200).json({ massage: 'post created.' })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getPost = (req, res, next) => {
  const postId = req.body.postId
  db.Post.findOne({
    where: { id: postId },
    include: [
      db.User,
      db.Photo,
      { model: db.Comment, include: [db.User, db.CommentLike] },
    ],
  }).then((post) => {
    res.status(200).json({ post: post })
  })
}

exports.comment = (req, res, next) => {
  const postId = req.body.postId
  const comment = req.body.comment
  db.Comment.create({
    comment: comment,
    userId: req.user.userId,
    postId: postId,
  })
    .then(() => {
      res.status(201).json({ message: 'comment created.' })
    })
    .catch((err) => {
      next(err)
    })
}

exports.reply = (req, res, next) => {
  const postId = req.body.postId
  const commentId = req.body.commentId
  const comment = req.body.comment
  db.Comment.create(
    {
      comment: comment,
      userId: req.user.userId,
      postId: postId,
      isReply: true,
      replies: {
        replyId: commentId,
      },
    },
    { include: db.Reply }
  )
    .then(() => {
      res.status(201).json({ message: 'comment created.' })
    })
    .catch((err) => {
      next(err)
    })
}

exports.likePost = (req, res, next) => {
  const postId = req.body.postId
  db.PostLike.findOne({
    where: { userId: req.user.userId, postId: postId },
  })
    .then((like) => {
      if (!like) {
        db.PostLike.create({
          userId: req.user.userId,
          postId: postId,
        }).then(() => {
          res.status(200).json({ message: 'like post success.' })
        })
      } else {
        db.PostLike.destroy({
          where: { userId: req.user.userId, postId: postId },
        }).then(() => {
          res.status(200).json({ message: 'unlike post success.' })
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}

exports.likeComment = (req, res, next) => {
  const commentId = req.body.commentId
  db.CommentLike.findOne({
    where: { userId: req.user.userId, commentId: commentId },
  })
    .then((like) => {
      if (!like) {
        db.CommentLike.create({
          userId: req.user.userId,
          commentId: commentId,
        }).then(() => {
          res.status(200).json({ message: 'like comment success.' })
        })
      } else {
        db.CommentLike.destroy({
          where: { userId: req.user.userId, commentId: commentId },
        }).then(() => {
          res.status(200).json({ message: 'unlike comment success.' })
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}
