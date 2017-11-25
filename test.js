const config = require('./config');
const mysql = config.mysql;
const Sequelize = require('sequelize');
const log = console.log;
const crypto = require('crypto');

// const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
//   host: mysql.host
// })

// const User = sequelize.define('user', {
//   name: Sequelize.STRING,
//   uuid: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//   }
// })
// 
const ejs = require('ejs');
const tpl = `<% if (user) { %>
    <h2><%= user.name %></h2>
<% } %>`;
let str1 = ejs.compile(tpl);
let str2 = str1({user: {
  name:2
}})
let str = ejs.render(tpl, {
  user: {
    name: 1
  }
})
log(str2)
console.log(tpl)
console.log(JSON.stringify(tpl))