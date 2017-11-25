var express = require('express');
var router = express.Router();
let { Article, User, Tag, sequelize } = require('../model');
let moment = require('moment');
moment.locale('zh-cn');

/* GET home page. */
router.get('/', function(req, res, next) {
  // let tag = req.query.tab;
  let opts;

  opts = { limit: 10, offset: 0 , include: [{model: User, attributes: ['nickname']}, {model: Tag, attributes: ['tag']}]}

  // if (tag && tag != 'all') {
  //   opts.include[1].where = { tag }
  // }

  Article.findAll(opts).then((project) => {
    project = JSON.parse(JSON.stringify(project));
    // console.log(JSON.stringify(project, null, 2));
    console.log(project)
    project.map((obj) => {
      obj.createdAt = moment(obj.createdAt).fromNow();
      return obj;
    })
    res.render('index', {
      isLogin: !!req.session.user,
      articles: project
    });
  })
})

module.exports = router;