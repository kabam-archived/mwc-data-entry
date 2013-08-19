var mwcCore = require('kabam-kernel'),
  express = require('express'),
  url = require('url'),
  path = require('path');

//setting up the config
var MWC = mwcCore({
  'mongoUrl': "mongodb://localhost/mwc_dev",
  'hostUrl': 'http://vvv.msk0.ru/',//'http://mwcwelcome.herokuapp.com/',//todo - change it to your site!
  'secret': ((process.env.secret) ? (process.env.secret) : 'lAAAAalalala1')
});

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
}

MWC.extendMiddleware(['development', 'staging', 'production'], '/api', protectorMiddlewareFunction);
MWC.extendMiddleware(['development', 'staging', 'production'], '/data-entry', protectorMiddlewareFunction);

MWC.usePlugin(require('kabam-plugin-rest'));
MWC.extendModel('Colleges', require('./models/colleges.js'));
MWC.extendMiddleware(function (mwc) {
  return express.static(path.join(__dirname, 'public'));
});

// this should be defined in a grunt task when we will integrate mwc with grunt
// NO, this have to be done by publish asserts command


//TODO - see readme - https://github.com/mykabam/kabam-kernel/blob/master/README.md#introduction

MWC.extendMiddleware('production',function(core){
    return express.static(path.join(__dirname, 'public'));
  });
MWC.extendMiddleware('production',function(core){
    return express.static(path.join(__dirname, '.tmp'));
  });

MWC.extendMiddleware('production',function(core){
    return express.static(path.join(__dirname, 'dist/public'));
  });


//TODO: should be in core? //no, not in this wau
MWC.extendMiddleware(function(core){
  return function(req, res, next) {
    // only return XSRF-TOKEN for index page
    if(url.parse(req.url).pathname === '/') {
      res.cookie('XSRF-TOKEN', req.session._csrf);
    }
    next();
  }
});


MWC.extendRoutes(function (core) {

  core.app.get('/', function (request, response) {
    if (request.user) {
      response.render('logined');
    } else {
      response.status(403);
      response.render('auth', {'title': "MWC-Data-Entry"});
    }
  });

  core.app.get('/data-entry', function (request, response) {
    if (request.user) {
      response.send('It will be a single page application seed page for data entry');
    } else {
      response.send(401);
    }
  });
});

MWC.start();

