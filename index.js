var MWCKernel = require('kabam-kernel'),
  express = require('express'),
  url = require('url'),
  path = require('path'),
  ENV = process.env.NODE_ENV || 'development',
  config = require('./config/config.json')[ENV];

//setting up the config
var MWC = MWCKernel(config);

MWC.extendApp(function (core) {
  core.app.locals.delimiters = '[[ ]]';
});

MWC.usePlugin(require('kabam-plugin-hogan'));

var protectorMiddlewareFunction = function (mwc) {
  return function (request, response, next) {
    if (request.user) {
      if (request.user.hasRole('worker') || request.user.hasRole('supervisor')) {
        next();
      } else {
        //this user is NOT INVITED!!!
        response.send(403, 'Sorry, you can\'t work, you need permission from supervisor!');
        return;
      }
    } else {
      next();
    }
  };
};

MWC.extendMiddleware(['development', 'staging', 'production'], '/api', protectorMiddlewareFunction);
//MWC.extendMiddleware(['development', 'staging', 'production'], '/data-entry', protectorMiddlewareFunction);

MWC.usePlugin(require('kabam-plugin-rest'));
MWC.extendModel('Colleges', require('./models/colleges.js'));


MWC.extendMiddleware('development', function (core) {
  return express.static(path.join(__dirname, 'public'));
});
MWC.extendMiddleware('development', function (core) {
  return express.static(path.join(__dirname, '.tmp'));
});

MWC.extendMiddleware('production', function (core) {
  return express.static(path.join(__dirname, 'dist/public'));
});



MWC.extendRoutes(function (core) {
  core.app.get('/*', function (request, response, next) {
    //TODO: any methods on a user to get a frontend-friendly profile?
    var user = {};
    if(request.user){
      user = {
        'username':request.user.username,
        'email':request.user.email
      }
    }
    response.render('index', {
      user: JSON.stringify(user).replace('</', '<\/')
    });
  });
});

MWC.start();

