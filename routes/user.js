var express = require('express');
var router = express.Router();
let { User, Tag, Article } = require('../model');
let moment = require('moment');
moment.locale('zh-cn');

/* GET users listing. */
router.get('/:userId', function(req, res) {
  const userSession = req.session.user;
  const userId = req.params['userId'];
  const opts = { where: {id: userId} , include: [{model: Article}, {model: Tag, attributes: ['tag']}]};

  User.findOne(opts).then(user => {
    user = JSON.parse(JSON.stringify(user));
    console.log(JSON.stringify(user, null, 2));
    delete user.email;
    delete user.password;
    user.articles.map((obj) => {
      obj.createdAt = moment(obj.createdAt).fromNow();
      return obj;
    })
    res.render('user', {
      isLogin: !!req.session.user,
      user
    });
  })
});

module.exports = router;
