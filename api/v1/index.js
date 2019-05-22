/*
  Todo-App RESTful API
    (c) 2019 Alexandre Mulatinho
*/

var indexPage = function(request, response)
{
  if (request.cookies.lid) {
    db.user.findOne({
      where: { session_token: request.cookies.lid }
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
  router.patch('/tasks/:id', tasks.patch);
  router.put('/tasks/:id', tasks.update);
  router.delete('/tasks/:id', tasks.destroy);
  router.post('/tasks', tasks.create);


  return router;
}
