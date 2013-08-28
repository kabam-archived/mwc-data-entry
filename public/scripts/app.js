'use strict';

angular.module('mwcDataEntryApp', ['CoreAuth.Services', 'CoreAuth.Controllers'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {templateUrl:'/views/main.html', controller: 'MainCtrl'})
      .when('/login', {templateUrl: '/views/login.html', controller: 'GenericLoginCtrl'})
      .when('/signup', {templateUrl: '/views/signup.html', controller: 'GenericSignupCtrl', loginRequired: false})
      .otherwise({redirectTo: '/'})
  }])
  .run(['guard', function(guard){
    guard.watch();
  }]);
