const express = require('express');
const router = express.Router();
const { User, Tag } = require('../model');
const { createSha1 } = require('../lib/util');
const { checkNotLogin } = require('../lib/middlewares');

router.get('/', checkNotLogin, (req, res) => {
  if (req.session.user) {
    res.render('signup', {isLogin: true});
  } else {
    res.render('signup', {isLogin: false})
  }
})

router.post('/', (req, res) => {
  let body = req.body;
  let { email, nickname, password } = body;
  let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

  if (!reg.test(email)) return res.err('邮箱格式错误!');

  User.findOrCreate({
    where: {
      $or: [{ nickname }, { email }]
    },
    defaults: { nickname, email, password, tags: [{ tag: 'default' }] },
    include: [Tag]
  }).spread((user, created) => {
    if (created) {
      res.success({
        nickname,
        email
      })
    } else {
      if (user.get('email') === email) return res.err('邮箱已被注册');
      if (user.get('nickname') === nickname) return res.err('用户名已被注册');
    }
  })
})

module.exports = router;