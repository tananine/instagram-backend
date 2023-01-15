const express = require('express')
const isAuth = require('../middleware/is-auth.mid')
const postController = require('../controllers/post.controller')

const router = express.Router()

router.post('/create', isAuth, postController.create)
router.post('/get-post', isAuth, postController.getPost)
router.post('/comment', isAuth, postController.comment)
router.post('/reply', isAuth, postController.reply)
router.post('/like-post', isAuth, postController.likePost)
router.post('/like-comment', isAuth, postController.likeComment)

module.exports = router
