myApp.controller('decksIndex', ['$scope', '$http', '$routeParams', 'localStorageService', 'PlainsWalker', 'Deck', function($scope, $http, $routeParams, localStorageService, PlainsWalker, Deck){
  $scope.decks = localStorageService.get('decks');
	console.log('hi!');


  // Add meta info to decks

  $scope.decks.forEach(function(deck, i, decks){

  });
}]);