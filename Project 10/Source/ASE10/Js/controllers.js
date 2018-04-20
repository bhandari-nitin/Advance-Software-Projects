var my = angular.module('app', [])
    my.controller('loginctrl', function($scope,$http,$window) {
        console.log("hello");
        $scope.login = function(){
                    console.log("hlelle");
                    console.log($scope.formData.mail);
                    console.log($scope.formData.pw);
                    var config = {
                        headers : {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                        }
                    }
                    var req = $http.post('http://127.0.0.1:8081/login',$scope.formData);
                    req.success(function(data, status, headers, config) {
                        $scope.message = data;
                        if(data == "success")
                        {
                            $window.location.href = "/ASE10/Rest.html";
                        }
                        else
                        {
                            alert("incorrect credentials, try again");
                        }
                    });
                    req.error(function(data, status, headers, config) {
                        alert( "failure message: " + JSON.stringify({data: data}));
                    });
                };
            });

    my.controller('Signctrl', ['$scope', '$stateParams', '$location',

        function ($scope, $stateParams, $location) {
            var deleteUser = function(db, callback,res, req) {

                db.collection('restaurants').deleteOne(
                    { "mail": res.body.mail },
                    function(err, results) {
                        console.log(results);
                        callback();
                    }

                );
                $window.location.href = "/ASE10/signup.html";
            };



        }]);

    my.controller('Restctrl', ['$scope', '$stateParams','$http',

        function ($scope, $stateParams, $http) {

            var updateRestaurants = function(db, callback) {
                $window.location.href = "/ASE10/signup.html";
                db.collection('cname').updateOne(
                    { "fname" : "Arunit" },
                    {
                        $set: { "mail": res.body.mail },
                        $set: { "password": res.body.pw },
                        $currentDate: { "lastModified": true }
                    }, function(err, results) {
                        console.log(results);
                        callback();
                    });
            };
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);

                updateRestaurants(db, function() {
                    db.close();
                });
            });

        }]);