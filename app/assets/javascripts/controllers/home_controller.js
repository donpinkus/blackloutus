myApp.controller('home', ['$scope', '$http', '$location', 'PlainsWalker', 'localStorageService', function($scope, $http, $location, PlainsWalker, localStorageService){
  console.log('hi');

  $scope.plainsWalker = {
    name: null,
    password: null
  }

  
  $scope.login = function(){
    console.log('logging in');
    // First, try to get Plainswalker by name.
    $http.post('/api/login?name=' + $scope.plainsWalker.name + '&password=' + $scope.plainsWalker.password).then(function(response){
      console.log(response);
      if (response.data.success == true) {
        var plainsWalker = response.data.plains_walker;

        // Set their cookie so we know their the real deal.
        localStorageService.set('plains_walker', plainsWalker);

        // Redirect them inside the APP
        $location.path('/deck_editor');
      }
    });
  }
  
}]);