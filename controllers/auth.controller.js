const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = (req, res, next) => {
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  db.User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const error = new Error('email has been used.')
        error.statusCode = 401
        throw error
      }
      return bcrypt.hash(password, 12)
    })
    .then((hashedPw) => {
      const user = db.User.build({
        email: email,
        name: name,
        password: hashedPw,
      })
      return user.save()
    })
    .then((user) => {
      res.status(201).json({ message: 'user created.', userId: user.id })
    })
    .catch((err) => {
      next(err)
    })
}

exports.login = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser
  db.User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const error = new Error('email could not be found.')
        error.statusCode = 401
        throw error
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('wrong password.')
        error.statusCode = 401
        throw error
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id,
        },
        'instagram_secret',
        { expiresIn: '1h' }
      )
      res.status(200).json({ token: token })
    })
    .catch((err) => {
      next(err)
    })
}
