const express = require('express')
const router = express.Router()

const controlBlogs = require('../controller/blogsController')


router.post('/',controlBlogs.postBlogs)
router.get('/',controlBlogs.getBlogs)

module.exports = router
