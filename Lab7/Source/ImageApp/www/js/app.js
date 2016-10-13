var imageApp=angular.module("starter", ["ionic","ngCordova","firebase"]);

imageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

imageApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("firebase", {
            url: "/firebase",
            templateUrl: "templates/firebase.html",
            controller: "FirebaseController",
            cache: false
        })
        .state("secure", {
            url: "/secure",
            templateUrl: "templates/cordovaPlugin.html",
            controller: "cordovaPluginController"
        });
    $urlRouterProvider.otherwise('/firebase');
});

imageApp.controller("FirebaseController", function($scope, $state, $firebaseAuth) {

    var fbAuth = $firebaseAuth();

    $scope.login = function(username, password) {
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

    $scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username,
                password);
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

});

//secure controller
imageApp.controller("cordovaPluginController",  function($scope, $cordovaDeviceMotion, $cordovaVibration) {
    
    document.addEventListener("deviceready", function () {
    
    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
      var X = result.x;
      var Y = result.y;
      var Z = result.z;
      var timeStamp = result.timestamp;
        console.log(X);
    }, function(err) {
      // An error occurred. Show a message to the user
        alert("There was an error encountered!");
    });

  }, false);


  // watch Acceleration
  var options = { frequency: 10 };

  document.addEventListener("deviceready", function () {

    var watch = $cordovaDeviceMotion.watchAcceleration(options);
    watch.then(
      null,
      function(error) {
      // An error occurred
          alert("There was an error encountered");
      },
      function(result) {
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        var timeStamp = result.timestamp;
          console.log(X);
          document.body.background = "AXXPGo1eSO6Psq9cohyq_2.jpg";
              $cordovaVibration.vibrate(2000, 1000);
              $cordovaVibration.vibrate(0)
                
          
          });

  
/*      $cordovaDeviceMotion.clearWatch(watch).then(function(result) {
        // success
    
        }, function (error) {
        // error
        alert("There was an error processing your request");
      }); */

  }, false); 
});

imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera,$state) {

    $ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];
    $scope.fb = $firebaseAuth();
    var fbAuth = $scope.fb.$getAuth();
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    if(fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("firebase");  //directs to firebase page
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }

});
