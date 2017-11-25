module.exports = {
  mysql: {
    database: 'stack',
    username: 'root',
    password: '21`',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  session: {
    key: 'stack',
    secret: 'stack',
    maxAge: 2592000
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  // mail配置
  mail: {
    host: 'smtp.163.com',
    port: 25,
    secure: true,
    auth: {
      user: '15521002654@163.com',
      pass: 'wolf543050768',
    }
  },
  // 社区域名
  host: 'localhost',
  name: '全栈社区',
}