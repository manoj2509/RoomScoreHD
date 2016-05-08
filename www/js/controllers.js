angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    $scope.gotoDash = function () {
        $state.go('app.dash');
    }
    $scope.gotoShop = function () {
        $state.go('app.shop');
    }
    $scope.gotoChores = function () {
        $state.go('app.choresList');
    }
    $scope.gotoAbout = function () {
        $state.go('app.about');
    }
    $scope.signout = function () {
        $state.go('login');
    }
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };


})

.controller('ProfileCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('ChoresListCtrl', function($scope, $state) {
    $scope.chores = [
        { description: 'Check the mailbox', dateDue: 1 },
        { description: 'Clean the toilet', dateDue: 2 },
        { description: 'Cook food', dateDue: 2 }
    ];

    $scope.gotoReview = function() {
        $state.go('app.reviewList');
    }
})


  .controller('DashCtrl', function($scope, $state) {

    $scope.gotoDash= function() {
      $state.go('app.dash');
    }
  })
.controller('reviewListCtrl', function($scope) {
    $scope.reviews = [
        { title: 'Check the mailbox', id: 1 },
        { title: 'Clean the toilet', id: 2 },
        { title: 'Cook food', id: 3 }
    ];
})
.controller('SignUpCtrl', function($scope, $state) {
    $scope.signData = {};
    $scope.doSignUp = function() {
        console.log('Sign Up');
        $state.go('login');
        
    }
})
.controller('LoginCtrl', function($scope, $stateParams, $state) {
    $scope.loginData = {};
    // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
      $state.go('app.profile');

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
//    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
  };
});
