let { article, user, category, comment } = require('../models');
const { marked, moment } = require('../lib/util');

// 创建文章页
exports.article = async function(req, res) {
  
  const categoryList = await category.findAll({attributes: ['name']});
  console.log(categoryList);
  
  res.render('article', {
    isLogin: !!req.session.user,
    tags: categoryList,
  });
}

// 创建文章
exports.create = async function(req, res) {
  const session = req.session.user;
  let { title, content, tag } = req.body;
  if (!title.trim()) {
    return res.apiError('title字段不能为空');
  }
  if (!content.trim()) {
    return res.apiError('content字段不能为空');
  }

  const getUser = await user.findOne({where: {nickname: session.nickname}})
  const userId = getUser.get('id');
  const getCategory = await category.findOne({where: {name: tag}});
  const categoryId = getCategory.get('id');

  await article.create({
    title,
    content,
    userId,
    categoryId
  })

  res.apiSuccess('创建成功');
}

// markdown编译为HTML
exports.markdown = async function(req, res) {
  let { md } = req.body;
  let content = marked(md);

  res.apiSuccess({ content });
}

// 文章详情
exports.detail = async function(req, res) {
  const postId = req.params.postId;

  const articleObj = await article.findOne({where: {id: postId}});
  const pv = articleObj.get('pv') + 1;

  await article.update({pv}, {where: {id: postId}});

  let result = await article.findOne({
    where: {id: postId},
    attributes: ['id', 'title', 'content', 'createdAt', 'pv'],
    include: [
      {model: user, attributes: ['id', 'nickname']}
    ]
  })
  result = result.get({plain: true});
  result.content = marked(result.content);
  result.createdAt = moment(result.createdAt).fromNow();

  let commentList = await comment.findAll({
    where: {articleId: postId},
    attributes: ['id', 'content', 'createdAt'],
    include: [
      {model: user, attributes: ['id', 'nickname']}
    ]
  })

  commentList = JSON.parse(JSON.stringify(commentList));

  commentList.map(obj => {
    obj.createdAt = moment(obj.createdAt).fromNow();
    obj.content = marked(obj.content);
    return obj;
  });

  res.render('post_detail', {
    isLogin: !!req.session.user,
    post: result,
    comment: commentList
  })
}

