// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('vsong', ['ionic', 'vsong.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('splash', {
    url: '/',
    templateUrl: 'templates/splash.html',
    controller: 'SplashCtrl',
    onEnter: function($state, User) {
      User.checkSession().then(function(hasSession){
        if (hasSession) $state.go('tab.discover');
      });
    }
  })
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl',
    // don't load the state until we've populated our User, if necessary.
    resolve: {
      populateSession: function(User) {
        return User.checkSession();
      }
    },
    onEnter: function($state, User) {
      User.checkSession().then(function(hasSession){
        if (!hasSession) $state.go('splash');
      })
    }
  })
  .state('tab.discover', {
    url: '/discover',
    views: {
      'tab-discover': {
        templateUrl: 'templates/discover.html',
        controller: 'DiscoverCtrl'
      }
    }
  })
  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/');
})

.constant('SERVER', {
  //url: 'http://localhost:8100'
  //using public heroku server
  url: 'https://ionic-songhop.herokuapp.com'
});
