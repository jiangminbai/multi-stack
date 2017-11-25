let express = require('express');
let router = express.Router();
let { checkLogin, checkLoginApi } = require('../lib/middlewares');
let { Article, Tag, User } = require('../model');
let marked = require('marked');
let highlight = require('highlight.js');
let moment = require('moment');
moment.locale('zh-cn');

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
})

router.get('/create', checkLogin, (req, res) => {
  let sessionUser = req.session.user;
  if (sessionUser) {
    Tag.findAndCountAll({
      where: {userId: sessionUser.id}
    }).then(tag => {
      let count = tag.count;
      let list = JSON.parse(JSON.stringify(tag.rows));
      res.render('article', {
        isLogin: true,
        count,
        tags: list,
      });
    })
  } else {
    res.render('article', {isLogin: false});
  }
})

router.post('/create', checkLoginApi, (req, res) => {
  let user = req.session.user;
  let { title, content, tag } = req.body;
  if (!title) {
    return res.err('title字段不能为空');
  }
  if (!content) {
    return res.err('content字段不能为空');
  }
  Tag.findOne({
    where: {
      userId: user.id,
      tag
    }
  }).then(tag => {
    let tagId = tag.get('id');
    return Article.create({
      userId: user.id,
      tagId,
      title,
      content,
    })
  }).then(() => {
    res.success({
      userId: user.id,
      tag,
      title,
    })
  })
})

router.get('/detail/:postId', (req, res) => {
  let postId = req.params.postId;
  Article.findOne({
    where: {
      id: postId
    },
    include: [{model: User, attributes: ['nickname']}]
  }).then((project) => {
    let pv = project.get('pv');
    console.log(JSON.stringify(project, null, 2))
    Article.update(
      {pv: pv + 1},
      {where: {id: postId}}
    ).then(() => {
      project = project.get({
        plain: true
      })
      project.content = marked(project.content);
      project.createdAt = moment(project.createdAt).fromNow();
      res.render('post_detail', {
        isLogin: true,
        post: project
      })
    })
  })
})


module.exports = router;