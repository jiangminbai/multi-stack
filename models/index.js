const path = require('path');
const Sequelize = require('sequelize');
const { eachSeries } = require('async');
const config = require('../config');

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host
})

const User = sequelize.import(path.resolve(__dirname, './user'));
const Article = sequelize.import(path.resolve(__dirname, './article'));
const Tag = sequelize.import(path.resolve(__dirname, './tag'));
const Category = sequelize.import(path.resolve(__dirname, './category'));
const Topic = sequelize.import(path.resolve(__dirname, './topic'));
const Tcomment = sequelize.import(path.resolve(__dirname, './tcomment'));
const Acoment = sequelize.import(path.resolve(__dirname, './acomment'));
const Treply = sequelize.import(path.resolve(__dirname, './treply'));
const Areply = sequelize.import(path.resolve(__dirname, './areply'));
const Tagself = sequelize.import(path.resolve(__dirname, './tagself'));
const Userself = sequelize.import(path.resolve(__dirname, './userself'));

// blog关系
User.hasMany(Category);
Category.belongsTo(User);

Category.hasMany(Article);
Article.belongsTo(Category);

User.hasMany(Article);
Article.belongsTo(User);

Article.hasMany(Acoment);

Acoment.hasMany(Areply);

// bbs关系
User.hasMany(Topic);
Topic.belongsTo(User);

Tag.belongsToMany(Topic);
Topic.belongsToMany(Tag);

Topic.hasMany(Tcomment);

Tcomment.hasMany(Treply);

sequelize.sync()
// sequelize.drop();

exports.User = User;
exports.Article = Article;
exports.Tag = Tag;
exports.Acoment = Acoment;
exports.Areply = Areply;
exports.Tcomment = Tcomment;
exports.Treply = Treply;
exports.Tagself = Tagself;
exports.Userself = Userself;
exports.sequelize = sequelize;