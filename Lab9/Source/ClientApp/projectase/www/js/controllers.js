angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
    $scope.formData={};
    $scope.checkcredentials = function() {
        var uname=$scope.formData.username;
        var pass= $scope.formData.password;
    
        console.log(uname + " " + pass );
        if (uname!=null && pass!=null)
        {
           $location.path("/page4");
        }
    }
    $scope.next = function(){
        $location.path("/page3");
    }
}

])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location) {
    $scope.start =function(){
    
        $location.path("/page1");
        
    }


}])
   
.controller('mashUpCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
    $scope.formData ={};
    $scope.image = function(){
        
        var item1 = $scope.formData.item;
        var handler = $http.get("http://127.0.0.1:8081/restServices/"+item);
        handler.success(function(data){
            
        if(data!=null){
            console.log(data);
            var farm1 = data.photos.photo[0].farm;
            var id1 = data.photos.photo[0].id;
            var secret1 = data.photos.photo[0].secret;
            var server1 = data.photos.photo[0].server;
            $scope.image = "https://farm"+farm1+".staticflickr.com/"+server1+"/"+id1+"_"+secret1+"_m.jpg";
            $scope.wallmart();
        }
      
        })        
        handler.error(function(data){
            alert("There was an error processing your request");
        })
    }
    
    $scope.wallmart = function(){
        console.log("hey");
          var item1 = $scope.formData.item; 
    
        var handler = $http.get("http://127.0.0.1:8081/restServices/"+item);
                
                handler.success(function(data){
                    if(data!=null)
                        {
                            console.log(data);    
                             $scope.id2 = data.items[0].itemId;
                            $scope.name2 = data.items[0].name;
                            $scope.price2 = data.items[0].salePrice;
                            
                        
                    
                        }
                    
                })
                handler.error(function(data){
                alert("There was an error processing your request");
            
            })
        

    }
}])
 