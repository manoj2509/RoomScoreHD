angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicHistory, $window, md5) {

  var email = $window.localStorage.getItem('currentUserEmail');
  $scope.emailHash = md5.createHash(email);

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    $scope.gotoDash = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.dash');
    }
    $scope.gotoShop = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.shopList');
    }
    $scope.gotoChores = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.choresList');
    }
    $scope.gotoAbout = function () {
        $state.go('app.about');
    }
    $scope.signout = function () {
        $window.localStorage.setItem('loginToken','');
        $window.localStorage.setItem('currentUserID','');
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

.controller('ProfileCtrl', function($scope, md5, $window) {

  var email = $window.localStorage.getItem('currentUserEmail');
  $scope.emailHash = md5.createHash(email);

  var tokens = email.split("@");
  $scope.username = tokens[0];

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('AddChoresCtrl', function ( $scope, $http, $window ) {
  $scope.choreData = {};

  var room = $window.localStorage.getItem('currentRooms');
  var token = $window.localStorage.getItem('loginToken');

  // $http.get("http://roomscore.tech:3001/api/members?access_token="+token).success( function ( data ) {
  //   $scope.members = data;
  // } ).error( function ( data ) {
  //   console.log("error")
  //   console.log(data);
  // } );

  $scope.createTask = function () {

  }
})
.controller('ChoresListCtrl', function($scope, $state, $http, $window) {
    var room = $window.localStorage.getItem('currentRooms');
    $http.get('http://roomscore.tech:3001/api/tasks/?filter[where][room]='+room+'&filter[where][type]=chores').success(function(data) {
      $scope.chores = data;
    });

    $scope.gotoReview = function() {
        $state.go('app.reviewList');
    }
})


  .controller('DashCtrl', function($scope, $state, $window, $http) {

    var room = $window.localStorage.getItem('currentRooms');
    $http.get('http://roomscore.tech:3001/api/tasks/?filter[where][room]='+room+'&filter[where][type]=chores').success(function(data) {
      $scope.chores = data;
    });

    $scope.gotoReview = function() {
      $state.go('app.reviewList');
    }

    $http.get('http://roomscore.tech:3001/api/tasks/?filter[where][room]='+room+'&filter[where][type]=shopping').success(function(data) {
      $scope.shopList = data;
    });

  })
//.controller('reviewListCtrl', function($scope) {
//    $scope.reviews = [
//        { title: 'Check the mailbox', id: 1 },
//        { title: 'Clean the toilet', id: 2 },
//        { title: 'Cook food', id: 3 }
//    ];
//})
.controller('SignUpCtrl', function($scope, $state) {
    $scope.signData = {};
    $scope.doSignUp = function() {
        console.log('Sign Up');
        $state.go('login');

    }
})
.controller('ShopListCtrl', function($scope, $state, $http, $window) {
    console.log("In Controller");

  var room = $window.localStorage.getItem('currentRooms');
  $http.get('http://roomscore.tech:3001/api/tasks/?filter[where][room]='+room+'&filter[where][type]=shopping').success(function(data) {
    $scope.shopList = data;
  });

})
.controller('LoginCtrl', function($scope, $stateParams, $state, $http, $window, md5, $ionicPlatform) {
    $scope.loginData = {};
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      if($scope.loginData.username && $scope.loginData.password) {
        console.log('Doing login', $scope.loginData);
        $window.localStorage.setItem('currentUserEmail',$scope.loginData.username);
        $window.localStorage.setItem('currentUserPwd', md5.createHash($scope.loginData.password));
        $http.post( "http://roomscore.tech:3001/api/members/login", {
          email: $scope.loginData.username,
          password: md5.createHash($scope.loginData.password),
        } ).success(function(data) {
          console.log(data);
          $window.localStorage.setItem('loginToken',data.id);
          $window.localStorage.setItem('currentUserID',data.userId);

          $http.get("http://roomscore.tech:3001/api/members/" + data.userId + "?access_token=" + data.id)
            .success( function ( data ) {
              var push = new Ionic.Push({
                  "debug": true,
                  "onNotification": function(notification) {
                      var payload = notification.payload;
                      console.log(notification, payload);
                  },
                  "onRegister": function(data) {
                      console.log(data.token);
                  },
                  "pluginConfig": {
                      "ios": {
                          "badge": true,
                          "sound": true
                      },
                      "android": {
                          "iconColor": "#343434"
                      }
                  }
              });

              push.register(function(token) {
                  // Log out your device token (Save this!)
                  console.log("Got Token:",token.token);
                  push.saveToken(token);
              });
//              var push = pushNotification.init({
//                  "android": {
//                      "senderID": "139955519511"
//                  },
//                  "ios":{},
//                  "windows": {}
//              });
//              push.on('registration', function (data) {
//                  var device = data.registationID;
//                  console.log("User ID " + user_id);
//                  if(user_id) {
//                      console.log("deviceID " + device);
//                    $http({
//                        method: 'POST',
//                        url:    'https://api.ionic.io/push/notifications',
//                        headers: {
//                            'Content-Type': 'application/json',
//                            'Authorization': 'Bearer ' + jwt
//                        },
//                        data: {
//                            "tokens": tokens,
//                            "profile": profile,
//                            "notification": {
//                                "title": "Hi",
//                                "message": "Hello world!",
//                                "android": {
//                                    "title": "Hey",
//                                    "message": "Hello Android!"
//                                },
//                                "ios": {
//                                    "title": "Howdy",
//                                    "message": "Hello iOS!"
//                                }
//                            }
//                        }
//                    }).success(function (data, status, header,  config) {
//                        console.log("Successfully registered");
//                    }).error(function (e) {
//
//                    });
//                  } else {
//                      console.log("Failed" + user_id);
//                  }
//                  console.log(JSON.stringify(data));
//              });
//              push.on('notification', function (data) {
//                  console.log("Notif:");
//                  console.log(JSON.stringify(data));
//              });
//              push.on('error', function(data) {
//                  console.log("Error" + e);
//
//              });
              $window.localStorage.setItem('currentRooms', data.roomID);
              $state.go('app.dash');

            } ).error( function ( data ) {

              console.log("Error");
              console.log(data);

          } );

        }).error(function(data) {
          console.log("Error");
          console.log(data);
        });

      }
    };
});
