const express = require('express');
const router = express.Router();
const { userRequired, userExisted, userRequiredByPost, adminRequired } = require('./lib/middlewares');
const { index } = require('./controllers/index');
const sign = require('./controllers/sign');
const article = require('./controllers/article');
const comment = require('./controllers/comment');

// index
router.get('/', index);

// sign
router.get('/signup', userExisted, sign.getSignup);
router.post('/signup', sign.signup);
router.get('/signin', userExisted, sign.getSignin);
router.post('/signin', userExisted, sign.signin);
router.get('/signout', sign.signout);

// article
router.get('/article/create', article.article);
router.post('/article/create', article.create);
router.post('/article/markdown', article.markdown);
router.get('/article/detail/:postId', article.detail);

// comment
router.post('/comment', comment.pubComment);

module.exports = router;