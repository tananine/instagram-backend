const express = require('express')
const authRouters = require('./auth.router')
const postRouters = require('./post.router')
const feedRouters = require('./feed.router')
const profileRouters = require('./profile.router')

const routers = express.Router()

routers.use('/auth', authRouters)
routers.use('/post', postRouters)
routers.use('/feed', feedRouters)
routers.use('/profile', profileRouters)

module.exports = routers
