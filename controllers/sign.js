const {
  findUserByName,
  findUserByEmail,
  findUserByNameOrEmail,
  findUserByNameAndKey,
  setUserActive,
  setUserKeyAndTime,
  setUserByName,
  createUser,
} = require('../proxy/user');
const validator = require('validator');
const { validateName, hash } = require('../lib/util');
const { sendActiveMail, sendResetPassMail } = require('../lib/mail');
const utility = require('utility');
const uuid = require('uuid');
const config = require('../config');

exports.getSignup = function (req, res) {
  res.render('sign/signup');
}

exports.signup = function (req, res) {
  let body = req.body;
  let email = validator.trim(body.email).toLowerCase();
  let nickname = validator.trim(body.nickname).toLowerCase();
  let password = validator.trim(body.password);

  if ([email, nickname, password].some((item) => return item === '')) {
    return res.error('信息不完整');
  }
  if (nickname.length < 4) {
    return res.error('用户名不能小于4个字符');
  }
  if (typeof nickname.charAt() === 'number' || nickname.charAt() === '_' || nickname.charAt() ==== '-') {
    return res.error('用户名首字符不能为数字、_或-');
  }
  if (!validateName(nickname)) {
    return res.error('用户名只能由数字、字母(不分大小写)、_和-组成');
  }
  if (!validator.isEmail(email)) {
    return res.error('邮箱不合法');
  }

  ;(async () => {
    const passhash = await hash(password, 10);
    const user = await findUserByNameOrEmail(nickname, email);
    if (user.get('email') === email) return res.apiError('邮箱已被注册');
    if (user.get('nickname') === nickname) return res.apiError('用户名已被注册');

    await createUser(nickname, email, passhash);
    sendActiveMail(email, nickname, utility.md5(email, passhash, config.session.secret));
    res.apiSuccess(`欢迎加入${config.name}！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。`);
  })();
}

exports.getSignin = function (req, res) {
  res.render('sign/signin');
}

exports.signin = function (req, res) {
  let body = req.body;
  let email = validator.trim(email).toLowerCase();
  let password = validator.trim(password);

  if ([email, password].some((item) => return item ==='')) {
    return res.apiError('缺少参数');
  }

  ;(async () => {
    const passhash = await hash(password, 10);
    const user = await findUserByEmail(email);
    if (user) {
      if (user.get('password') === passhash)
        return res.apiSuccess({email})
      return res.apiError('密码错误');
    }
    res.apiError('此邮箱未被注册');
  })();
}

exports.signout = function (req, res) {
  req.session.destory();
  res.apiSuccess('成功退出');
}

exports.activateAccount = function (req, res) {
  let name = validator.trim(req.query.name);
  let key = validator.trim(req.query.key);

  ;(async () => {
    const user = await findUserByName(name);
    if (!user || utility.md5(user.email, user.password, config.session.secret) !== key) {
      return res.apiError('信息有误');
    }
    if (user.active) {
      return res.apiError('帐号已被激活');
    }

    await setUserActive(name);
    res.apiSuccess('激活成功');
  })();
}

exports.getForgetPass = function (req, res) {
  res.render('sign/forget');
}

exports.forgetPass = function (req, res) {
  const email = validator.trim(req.body.email).toLowerCase();
  if (!validator.isEmail(email)) return res.apiError('邮箱不合法');

  const retrieveKey = uuid.v4();
  const retrieveTime = new Date().getTime();
  ;(async () => {
    const user = await findUserByEmail(email);
    if (!user) return res.apiError('没有这个邮箱');
    await setUserKeyAndTime(retrieveKey, retrieveTime);
    sendResetPassMail(email, user.get('nickname'), retrieveKey);
    res.apiSuccess('我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。');
  })();
}

exports.getResetPass = function (req, res) {
  res.render('sign/reset_pass');
}

exports.resetPass = function (req, res) {
  const body = req.body;
  const nickname = validator.trim(body.nickname);
  const password = validator.trim(body.password);
  const repassword = validator.trim(body.repassword);
  const key = validator.trim(body.key);

  if (password !== repassword) return res.apiError('密码不一致');

  ;(async () => {
    const user = await findUserByNameAndKey(nickname, key);
    if (!user) return res.apiError('错误的激活链接');

    const now = new Date().getTime();
    const resetTime = user.get('retrieve_time');
    const oneDay = 1000 * 60 * 60 * 24;
    if (now - resetTime > oneDay) return res.apiError('该链接已过期，请重新申请。');

    const passhash = await hash(password, 10);
    await setUserByName(nickname, {
      password: passhash,
      retrieve_key: null,
      retrieve_time: null
    })

    res.apiSuccess('密码重置成功');
  })();
}