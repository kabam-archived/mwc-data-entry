var mwcCore = require('mwc_kernel'),
  express = require('express'),
  path = require('path');


//setting up the config
var MWC = mwcCore({
  'hostUrl':'http://vvv.msk0.ru/',//'http://mwcwelcome.herokuapp.com/',//todo - change it
  'secret': ((process.env.secret)?(process.env.secret):'lAAAAalalala1')
});

MWC.extendApp(function(core){
  MWC.app.locals.delimiters = '[[ ]]';
});
MWC.usePlugin(require('mwc_plugin_hogan_express'));



MWC.extendMiddlewares(function(core){
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
MWC.listen();

MWC.on('notify',function(message){
  console.log(message);
});

