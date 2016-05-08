// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic.service.core', 'ionic.service.push', 'angular.filter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: '6c6701d1',
    api_key: '3cd4690f5e27d8bded761480138742e90d94d0f9f4c1d683',
    dev_push: true
  });
}])
.config(function($stateProvider, $urlRouterProvider, $windowProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })


    .state('app.addChores', {
      url: '/addChores',
      views: {
        'menuContent': {
          templateUrl: 'templates/addChores.html'
        }
      }
    })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
  .state('app.choresList', {
      url: '/choresList',
      views: {
          'menuContent': {
              templateUrl: 'templates/choresList.html',
              controller: 'ChoresListCtrl'
          }
      }
  })

    .state('app.dash', {
      url: '/dash',
      views: {
        'menuContent': {
          templateUrl: 'templates/dash.html',
          controller: 'DashCtrl'
        }
      }
    })
  .state('app.shopList', {
      url: '/shopList',
      views: {
          'menuContent': {
              templateUrl: 'templates/shopList.html',
              controller: 'ShopListCtrl'
          }
      }
  })
//  .state('app.reviewList', {
//      url: '/reviewList',
//      views: {
//          '': {
//              templateUrl: 'templates/reviewList.html',
//              controller: 'reviewListCtrl'
//          }
//      }
//  })
  .state('signup', {
        url: '/signUp',
        views: {
            '': {
                templateUrl: 'templates/signUp.html',
                controller: 'SignUpCtrl as vm'
            }
        }
    })
    .state('login', {
        url: '/login',
        views: {
            '': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl as login'
            }
        }
    });

  var $window = $windowProvider.$get();
  var loginToken = $window.localStorage.getItem('loginToken');

  console.log(loginToken);

  // if none of the above states are matched, use this as the fallback
  if ( !loginToken ) {
    $urlRouterProvider.otherwise('/login');
  } else {
    $urlRouterProvider.otherwise('/app/dash');
  }
});
