var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("hbs")

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var productRouter = require('./controllers/product');
var orderRouter = require('./controllers/order');
var loginRouter = require("./controllers/login")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json()); //json
app.use(express.urlencoded({ extended: false })); //form
var session = require('express-session');

//cookie 字符串转成json
app.use(cookieParser('qf'));
//配置express服务器session
app.use(session({
    secret: 'qf',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));

//静态的文件直接返回，不通过路由处理
app.use(express.static(path.join(__dirname, 'public')));

//注册页面的一级路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/product",productRouter)
app.use("/order",orderRouter)
app.use("/login",loginRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
