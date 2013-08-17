var mwcCore = require('mwc_kernel'),
  express = require('express'),
  path = require('path');

//setting up the config
var MWC = mwcCore({
  'mongoUrl':"mongodb://localhost/mwc_dev",
  'hostUrl':'http://vvv.msk0.ru/',//'http://mwcwelcome.herokuapp.com/',//todo - change it to your site!
  'secret': ((process.env.secret)?(process.env.secret):'lAAAAalalala1')
});

MWC.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});
MWC.usePlugin(require('mwc_plugin_hogan_express'));
MWC.usePlugin(require('mwc_plugin_rest'));
MWC.extendModel('Colleges',require('./models/colleges.js'));
MWC.extendMiddleware(function(core){
  return express.static(path.join(__dirname, 'public'));
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
});
MWC.start();

