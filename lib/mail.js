// const nodemailer = require('nodemailer');
// const config = require('../config');
// const mail = config.mail;
// const SITE_ROOT_URL = `http://${config.host}`;
// const transporter = nodemailer.createTransport(mail);

// /**
//  * 发送邮件
//  * @param  {string} 发件人邮箱
//  * @param  {string} 收件人邮箱
//  * @param  {string} 主题
//  * @param  {string} 邮件内容
//  * @return {undefined}
//  */
// const sendMail = function (fromEmail, toEmail, subject, html) {
//   let fromEmailStr = `${config.name} <${fromEmail}>`;
//   transporter.sendMail({from: fromEmailStr, to: toEmail, subject, html}, (err, info) => {
//     if (err) return console.log(err);
//     console.log(`message sent: ${info.response}`);
//   })
// }

// const sendActiveMail = function (userEmail, userName, token) {
//   let fromEmail = mail.email;
//   let subject = `${config.name}帐号激活`;
//   let html = `<p>您好：${userName}</p>
//     <p>我们收到您在${config.name}的注册信息，请点击下面的链接来激活帐户：</p>
//     <a href  = "${SITE_ROOT_URL}/active_account?key=${token}&name=${userName}">激活链接</a>
//     <p>若您没有在${config.name}填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>
//     <p>${config.name} 谨上。</p>`

//   sendMail(fromEmail, userEmail, subject, html);
// }

// exports.sendActiveMail = sendActiveMail;

// const sendResetPassMail = function (userEmail, userName, token) {
//     const fromEmail = mail.email;
//     const subject = `${config.name}密码重置`;
//     const html = `<p>您好：${userName}</p>
//       <p>我们收到您在${config.name}重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>
//       <a href="${SITE_ROOT_URL}/reset_pass?key=${token}&name=${userName}">重置密码链接</a>
//       <p>若您没有在${config.name}填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>
//       <p>${config.name} 谨上。</p>`

//   sendMail(fromEmail, userEmail, subject, html);
// }

// exports.sendResetPassMail = sendResetPassMail;