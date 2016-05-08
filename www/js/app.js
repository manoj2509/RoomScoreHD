// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic.service.core', 'ionic.service.push', 'angular.filter', 'angular-md5', 'ionic.contrib.ui.tinderCards2'])
.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: '6c6701d1',
    api_key: '3cd4690f5e27d8bded761480138742e90d94d0f9f4c1d683',
    dev_push: true
  });
}])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
          
      }
      var push = new Ionic.Push({
          "debug": true,
          "onNotification": function(notification) {
              var payload = notification.payload;
              console.log(notification, payload);
          },
          "onRegister": function(data) {
              console.log(data.token);
          }
      });

      $ionicPush.register();
      if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
      }
  });
})

  .directive('noScroll', function($document) {

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {

        $document.on('touchmove', function(e) {
          e.preventDefault();
        });
      }
    }
  })

  .controller('CardsCtrl', function($scope, TDCardDelegate, $timeout,$rootScope) {

    var cardTypes = [
      { image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
      { image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
      { image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
      { image: 'http://c1.staticflickr.com/1/297/19072713565_be3113bc67_n.jpg' },
      { image: 'http://c1.staticflickr.com/1/536/19072713515_5961d52357_n.jpg' },
      { image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
      { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' }
    ];


    $scope.cards = {
      master: Array.prototype.slice.call(cardTypes, 0),
      active: Array.prototype.slice.call(cardTypes, 0),
      discards: [],
      liked: [],
      disliked: [],

    }

    $scope.cardDestroyed = function(index) {
      $scope.cards.active.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[0];
      $scope.cards.active.push(angular.extend({}, newCard));

    }

    $scope.refreshCards = function() {
      // Set $scope.cards to null so that directive reloads
      $scope.cards.active = null;
      $timeout(function() {
        $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
      });
    }

    $scope.$on('removeCard', function(event, element, card) {
      var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
      $scope.cards.discards.push(discarded);
    });

    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      var card = $scope.cards.active[index];
      $scope.cards.disliked.push(card);
    };
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      var card = $scope.cards.active[index];
      $scope.cards.liked.push(card);
      $rootScope.like += 1;
    };

  })

  .controller('CardCtrl', function($scope, TDCardDelegate) {

  })
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
          templateUrl: 'templates/addChores.html',
          controller: 'AddChoresCtrl'
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

$rootScope.like=0;
