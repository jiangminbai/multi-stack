const express = require('express');
const router = express.Router();
const { User, Tag } = require('../model');
const { createSha1 } = require('../lib/util');
const { checkNotLogin } = require('../lib/middlewares');

router.get('/', checkNotLogin, (req, res) => {
  if (req.session.user) {
    res.render('signin', {isLogin: true});
  } else {
    res.render('signin', {isLogin: false})
  }
})

router.post('/', (req, res) => {
  let body = req.body;
  let { email, password } = body;

  User.sync().then(() => {
    return User.findOne({
      where: { email }
    })
  }).then((project) => {
    if (project) {
      let project_plain = project.get({plain: true});
      let password_sha1 = createSha1(password);
      if (password_sha1 === project_plain.password) {
        delete project_plain.password;
        req.session.user = project_plain;
        res.success({ email, password });
      } else {
        res.err('密码错误');
      }
    } else {
      res.err('此邮箱未被注册');
    }
  })
})

module.exports = router;