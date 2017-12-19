module.exports = {
  mysql: {
    database: 'stack',
    username: 'root',
    password: '123',
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
  // 社区域名
  host: 'localhost',
  name: '全栈社区',
}