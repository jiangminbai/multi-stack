let { comment, user } = require('../models');
// 发表评论
exports.pubComment = async function(req, res) {
  const userId = req.session.user && req.session.user.id;
  const articleId = req.body.articleId;
  const content = req.body.content;

  if (!userId) return res.apiError('还未登录');
  if (!content.trim()) res.apiError('不能发表空内容');

  const commentObj = await comment.create({
    userId,
    articleId,
    content
  });

  const commentId = commentObj.get('id');

  let result = await comment.findOne({
    where: {id: commentId},
    attributes: ['id', 'content', 'createdAt'],
    include: [
      {model: user, attributes: ['id', 'nickname']}
    ]
  });
  result = result.get({plain: true});

  res.apiSuccess({
    result
  });
}