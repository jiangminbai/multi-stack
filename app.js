let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let { wrapRes } = require('./lib/middlewares');
let config = require('./config');

let app = express();

app.use(wrapRes);

// let index = require('./routes/index');
// let user = require('./routes/user');
// let signup = require('./routes/signup');
// let signin = require('./routes/signin');
// let logout = require('./routes/logout');
// let article = require('./routes/article');
// let markdown = require('./routes/markdown');
// let tag = require('./routes/tag');
const router_api = require('./router_api');
const router_web = require('./router_web');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new RedisStore(config.redis)
}))

// app.use('/', index);
// app.use('/user', user);
// app.use('/signup', signup);
// app.use('/signin', signin);
// app.use('/logout', logout);
// app.use('/article', article);
// app.use('/markdown', markdown);
// app.use('/tag', tag);
app.use('/api', router_api);
app.use('/', router_web);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
