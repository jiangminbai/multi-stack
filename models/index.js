const path = require('path');
const { hash } = require('../lib/util');
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host
})

const user = sequelize.import(path.resolve(__dirname, './user'));
const article = sequelize.import(path.resolve(__dirname, './article'));
// const Tag = sequelize.import(path.resolve(__dirname, './tag'));
const category = sequelize.import(path.resolve(__dirname, './category'));
// const Topic = sequelize.import(path.resolve(__dirname, './topic'));
// const Tcomment = sequelize.import(path.resolve(__dirname, './tcomment'));
const comment = sequelize.import(path.resolve(__dirname, './comment'));
// const Treply = sequelize.import(path.resolve(__dirname, './treply'));
// const Areply = sequelize.import(path.resolve(__dirname, './areply'));
// const Tagself = sequelize.import(path.resolve(__dirname, './tagself'));
// const Userself = sequelize.import(path.resolve(__dirname, './userself'));

// blog关系
category.hasMany(article);
article.belongsTo(category);

user.hasMany(article);
article.belongsTo(user);

user.hasMany(comment);
comment.belongsTo(user);
article.hasMany(comment);

;(async () => {
  await sequelize.sync()
  await createCategory();
  await createFirstUser();
  await createFirstArticle();
  // sequelize.drop();
})();

async function createCategory() {
  const name = ['webfront', 'nodejs', 'mysql', 'linux'];
  let result;
  for (let i = 0; i < name.length; i++) {
    result = await category.findOrCreate({
      where: {name: name[i]},
      defaults: {name: name[i]}
    });
  }
  return result;
}

async function createFirstUser() {
  const passhash = await hash('123456', 10);

  return user.findOrCreate({
    where: {nickname: '大王来巡山'},
    defaults: {
      nickname: '大王来巡山',
      email: 'test@qq.com',
      password: passhash,
      active: true
    }
  })
}

async function createFirstArticle() {
  article.findOrCreate({
    where: {id: 1},
    defaults: {
      userId: 1,
      categoryId: 1,
      title: 'welcome to 全栈社区',
      content: '代码开源：[https://github.com/jan-wong/multi-stack#multi-stack](https://github.com/jan-wong/multi-stack#multi-stack)',
    }
  })
}

exports.user = user;
exports.category = category;
exports.article = article;
exports.comment = comment;
exports.sequelize = sequelize;