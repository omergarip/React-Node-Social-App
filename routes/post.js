const express = require('express');
const { requireSignin } = require('../controllers/auth');
const { getPosts, createPost } = require('../controllers/post');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router;
