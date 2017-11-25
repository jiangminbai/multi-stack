const express = require('express');
const router = express.Router();
const { userRequired, userExisted, userRequiredByPost, adminRequired } = require('./lib/middlewares');
const sign = require('./controllers/sign');

// sign
router.get('/signup', userExisted, sign.getSignup);
router.post('/signup', sign.signup);
router.get('/signin', userExisted, sign.getSignin);
router.post('/signin', userExisted, sign.signin);
router.get('/signout', sign.signout);

module.exports = router;