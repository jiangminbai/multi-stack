exports.wrapRes = function (req, res, next) {
  res.apiSuccess = (data) => {
    res.json({
      code: 200,
      status: 'success',
      data
    })
  }
  res.apiError = (error) => {
    res.json({
      code: -200,
      status: 'error',
      error
    })
  }
  next();
}

exports.userRequired = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/user/signin')
  }
  next();
}

exports.userExisted = function (req, res, next) {
  if (req.session.user) {
    return res.redirect('back');
  }
  next();
}

exports.userRequiredByPost = function (req, res, next) {
  if (!req.session.user) {
    return res.error('未登录');
  }
  next();
}

exports.adminRequired = function (req, res, next) {
  next();
}