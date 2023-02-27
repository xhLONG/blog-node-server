const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('./logger')
// var bodyParser = require('body-parser');

// 路由文件引用
const indexRouter = require('./routes/v2/index')
const usersRouter = require('./routes/v2/users')

// express实例化
const app = express()

// 设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev')) // 打印日志
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/v2', indexRouter)
app.use('/v2/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
/* 处理非404的错误（throw出来的错误） */
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ${err.message}`)
  const errorMsg = err.message
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {}
  })
}
app.use(_errorHandler)

module.exports = app
