module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.header('Content-Type', 'text/html;charset=utf-8')
    res.render('index', { title: 'Express' })
  })
  app.use('/v2/users', require('./v2/users'))
  app.use('/v2/refreshToken', require('./v2/refreshToken'))
  app.use('/v2/signup', require('./v2/signup'))
  app.use('/v2/signin', require('./v2/signin'))
  // app.use('/signout', require('./signout'))
  // app.use('/posts', require('./posts'))
  // app.use('/comments', require('./comments'))
}
