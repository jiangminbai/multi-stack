let { article, category, user, sequelize } = require('../models');
// let { moment } = require('../lib/util');
let moment = require('moment');
moment.locale('zh-cn');

// 首页
exports.index = async function(req, res, next) {
  const query = req.query;
  const table = query.table;
  const page = query.page || 0;
  const limit = 10;
  const offset = limit * page;

  const opts = { 
    limit,
    offset, 
    include: [
      {model: user, attributes: ['nickname']},
      {model:category, where: table ? {name: table} : null, attributes: ['name']}
    ]
  };
  let articleList = await article.findAll(opts);
  let categoryList = await category.findAll({attributes: ['name']});

  categoryList = JSON.parse(JSON.stringify(categoryList));
  categoryList.splice(0, 0, {name: 'all'});
  categoryList.map(obj => {
    if (obj.name === 'all' && !table) obj.active = true;
    if (table && obj.name === table) obj.active = true;
    return obj;
  })

  res.render('index', {
    isLogin: !!req.session.user,
    articles: articleList,
    categories: categoryList
  })
}