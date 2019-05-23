/*
  Todo-App RESTful API
    (c) 2019 Alexandre Mulatinho
*/

require('./common.js')

// first view
var indexPage = function(request, response)
{
  if (request.cookies.todoid) {
    db.user.findOne({
      where: { session_token: request.cookies.todoid }
    }).then(function(userFound) {
      if (!userFound) {
        return response.render('index', {user: null});
      } else {
        return response.redirect('/tasks');
      }
    });
  } else {
    response.render('index', {user: null});
  }
}

exports.connect = function(router, sequelize) {
  var sessions = require('./sessions');
  var tasks    = require('./tasks');
  var tags     = require('./tags');

  //index
  router.get('/', indexPage);

  // session
  router.post('/sessions/login', sessions.login);
  router.post('/sessions/signup', sessions.signup);
  router.get('/sessions/github', sessions.authWithGithub);
  router.get('/sessions/logout', sessions.destroy);

  // tasks
  router.get('/tasks', tasks.get);
  router.get('/tasks/:id', tasks.get);
  router.put('/tasks/:id', tasks.update);
  router.delete('/tasks/:id', tasks.destroy);
  router.post('/tasks', tasks.create);

  // tasks
  router.get('/tags', tags.get);
  router.post('/tags', tags.create);
  router.delete('/tags/:id', tags.destroy);

  return router;
}
