const express = require('express')
const isAuth = require('../middleware/is-auth.mid')
const profileController = require('../controllers/profile.controller')

const router = express.Router()

router.get('/get-nav-profile', isAuth, profileController.getNavProfile)
router.post('/get-profile', isAuth, profileController.getProfile)
router.post('/follow', isAuth, profileController.follow)
router.get('/get-like', isAuth, profileController.getLike)
router.get('/get-follower', isAuth, profileController.getFollower)

module.exports = router
