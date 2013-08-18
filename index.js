var MWCKernel = require('kabam-kernel'),
  express = require('express'),
  path = require('path'),
  url = require('url'),
  ENV = process.env.NODE_ENV || 'development',
  config = require('yaml-config').readConfig(__dirname + '/config/config.yaml', ENV);

//setting up the config
var mwc = MWCKernel(config);

mwc.usePlugin(require('mwc_plugin_hogan_express'));

mwc.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});


//TODO: this should be defined in a grunt task when we will integrate mwc with grunt
if(ENV === 'development'){
  mwc.extendMiddleware(function(core){
    return express.static(path.join(__dirname, 'public'));
  });
  mwc.extendMiddleware(function(core){
    return express.static(path.join(__dirname, '.tmp'));
  });
}

if(ENV === 'production'){
  mwc.extendMiddleware(function(core){
    return express.static(path.join(__dirname, 'dist/public'));
  });
}

//TODO: should be in core?
mwc.extendMiddleware(function(core){
  return function(req, res, next) {
    // only return XSRF-TOKEN for index page
    if(url.parse(req.url).pathname === '/') {
      res.cookie('XSRF-TOKEN', req.session._csrf);
    }
    next();
  }
});


mwc.extendRoutes(function (core) {
  core.app.get('/', function (request, response) {
    response.render('index');
  });

  core.app.get('/api/colleges',function(request,response){
    if(request.user){
      request.model.Colleges.find({},function(err,colleges){
        response.json(colleges);
      });
    } else {
      response.send(401);
    }
  });
});

mwc.start(config.port);

