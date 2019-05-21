const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('sequelize');
const config = require(__dirname + '/config/config.js');

process.env.TZ = "America/Recife"
global.db      = require(__dirname + '/models');
global.defTimeCookie = 60 * 60 * 24 * 7 * 1000;

//
// Connect API methods
//

function routeApi(app, sequelize) {
  var router1 = express.Router();
  var v1 = require('./api/v1');

  v1.connect(router1, sequelize);
  app.use('/', router1);

  return router1;
}

//
// Setup stack
//

function configure(app) {
  app.use(function(req, res, next) { req.start = new Date(); next(); });
  app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 86400 }}));
  app.use(bodyParser.urlencoded({ limit: '3mb', extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser())
  app.use('/public', express.static(require('path').join(__dirname, '/public')));
  app.use('/public/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
  app.use('/public/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
  app.use('/.logs/', express.static(require('path').join(__dirname, '/logs')));
  app.set('views', './views');
  app.set('view engine', 'pug');
  app.disable('x-powered-by');
}

//
// Entry point for the application
//

function main() {
  var app = express();

  configure(app);
  routeApi(app, sequelize);

  // synchronize data, remaking the tables if neeeded.
  db.sequelize.sync({
    timezone: '-03:00'
  }).then(function () {
    var port = config.web.port;

    app.listen(port, function() {
      console.log('Listen on Port ' + port);
    });
  });

  // render 404 view if user browse something unexpected.
  app.use(function(req, res) { res.status(404).render('404'); });

  if ('production' == app.get('env') || 'production' == process.env.NODE_ENV) {
    // production error handler, no stacktraces leaked to user
    app.use(function(error, request, response, next) {
      console.log('logging events and showing stacktrace only local..')
      console.log('errorStatus: ', error.status, 'errorMessage: ', error.message);
      response.status(500).json({});
    })
  } else {
    // handle errors and print stacktrace
    app.use(function(error, request, response, next) {
      console.log('logging events and showing stacktrace..');
      console.log('message: ' + error.message + '\nerror: ' + error);
      response.status(error.status || 500).json({ 'message': error.message, 'error': error });
    })
  }
}

main();
