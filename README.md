# multi-stack
无栈-一个使用Node.js构建的简单的全栈社区，由一群有着无比学习激情，对未知永远充满着好奇，崇尚编程无边界的程序猿组成

## 前言

此项目使用Nodejs|Redis|Mysql|Express|Sequelize等技术实现，目前实现了这些模块：首页(包含分类列表|文章列表)、登录、注册、发表文章、文章详情页、评论功能

## 启动

```
mysql.server start  // 启动数据库
mysql -u root -p 密码  // 登录数据库
redis-server  // 启动redis
redis-cli     // 进入redis命令行交互界面
gulp dev      // 启动整个项目，可以自动编译前端LESS、自动刷新
// 注意：启动整个项目前，您需要根据config.js文件配置mysql|redis等等信息，否则无法启动
浏览器打开localhost:3000
```