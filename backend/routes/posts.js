const express = require('express');
const checkAuth = require('../midleware/check-auth')
const extractFile = require('../midleware/file')
const router = express.Router();
const PostControlers = require('../controlers/posts')



router.post('', checkAuth, extractFile, PostControlers.createPost)

router.put("/:id",checkAuth, extractFile, PostControlers.updatePost);

router.get('', PostControlers.getPosts);

router.get('/:id', PostControlers.getPost)

router.delete('/:id', checkAuth, PostControlers.deletePost);

module.exports = router;