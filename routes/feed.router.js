const express = require('express')
const isAuth = require('../middleware/is-auth.mid')
const feedController = require('../controllers/feed.controller')

const router = express.Router()

router.get('/get-feeds', isAuth, feedController.getFeeds)

module.exports = router
