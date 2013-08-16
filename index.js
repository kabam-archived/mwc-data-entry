var MWCKernel = require('mwc_kernel'),
  express = require('express'),
  path = require('path'),
  ENV = process.env.NODE_ENV || 'development',
  config = require('yaml-config').readConfig(__dirname + '/config/config.yaml', ENV);

//setting up the config
var mwc = MWCKernel(config);

mwc.usePlugin(require('mwc_plugin_hogan_express'));

mwc.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});

mwc.middleware(function(core){
  return express.static(path.join(__dirname, 'public'));
});

mwc.middleware(function(core){
  return express.static(path.join(__dirname, '.tmp'));
});


mwc.routes(function (core) {
  core.app.get('/', function (request, response) {
    if(request.user){
      response.render('logined');
    } else {
      response.status(403);
      response.render('auth');
    }
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

