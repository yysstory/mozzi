
var app = angular.module('starter', ['ionic','ngCordova'])
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
app.constant('CONSTANT',{
  //'url': '/ajax'
  'url':'http://yysstory.iptime.org:3000'
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })
    .state('app.join', {
      url: '/join',
      views: {
    'menuContent': {
      templateUrl: 'templates/join.html',
          controller: 'joinCtrl'
        }
      }
    })
    .state('app.board', {
      url: '/board',
      views: {
        'menuContent': {
          templateUrl: 'templates/board.html',
          controller: 'boardCtrl'
        }
      }
    })
    .state('app.reply', {
      url: '/reply/:boardNo',
      views: {
        'menuContent': {
          templateUrl: 'templates/reply.html',
          controller: 'replyCtrl'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/login');
});
