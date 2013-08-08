var mwcCore = require('mwc_kernel'),
  express = require('express'),
  path = require('path'),
  ENV = process.env.NODE_ENV || 'development',
  config = require('yaml-config').readConfig(__dirname + '/config/config.yaml', ENV);

//setting up the config
var MWC = mwcCore(config);

MWC.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});
MWC.usePlugin(require('mwc_plugin_hogan_express'));
MWC.extendModel('Colleges',require('./models/colleges.js'));
MWC.extendMiddleware(function(core){
  return express.static(path.join(__dirname, 'public'));
});

MWC.extendMiddleware(function(core){
  return express.static(path.join(__dirname, '.tmp'));
});


MWC.extendRoutes(function (core) {
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
MWC.start(config.port);

