var mwcCore = require('mwc_kernel'),
  express = require('express'),
  path = require('path');

//setting up the config
var MWC = mwcCore({
//'mongoUrl':"mongodb://localhost/mwcdataentry",
  'hostUrl':'http://vvv.msk0.ru/',//'http://mwcwelcome.herokuapp.com/',//todo - change it to your site!
  'secret': ((process.env.secret)?(process.env.secret):'lAAAAalalala1')
});

MWC.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});
MWC.usePlugin(require('mwc_plugin_hogan_express'));
MWC.extendModel('Colleges',require('./models/colleges.js'));
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
MWC.listen();

