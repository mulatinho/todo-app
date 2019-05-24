/*
  Todo-App RESTful API
    (c) 2019 Alexandre Mulatinho
*/

require('./common.js')

// first view
var indexPage = function(request, response)
{
  CheckUser(request, function(userNow) {
    if (!userNow) {
      return response.render('index', {user: null});
    } else {
      return response.redirect('/tasks');
    }
  })
}

exports.connect = function(router, sequelize) {
  var sessions = require('./sessions');
  var tasks    = require('./tasks');

  //index
  router.get('/', indexPage);

  // session
  router.post('/sessions/login', sessions.login);
  router.post('/sessions/signup', sessions.signup);
  router.get('/sessions/logout', sessions.destroy);

  // tasks
  router.get('/tasks', tasks.get);
  router.get('/tasks/:id', tasks.get);
  router.put('/tasks/:id', tasks.update);
  router.delete('/tasks/:id', tasks.destroy);
  router.post('/tasks', tasks.create);

  // tasks
  router.get('/watch-tasks', tasks.watch);

  return router;
}
