var myApp = angular.module('myApp', ['templates', 'ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'home'
    });
  }]);

myApp.controller('home', ['$scope', function($scope){
  console.log('home controller loaded!');

  $scope.turnStep = 1;

  $scope.nextStep = function() {
  	$scope.turnStep = $scope.turnStep == 9 ? 1 : $scope.turnStep + 1;
  	// Check if current step is draw phase. if so make them draw.

  	// figure out a way to track which players step's we're going through
  }

  $scope.opponent = {
    life: 20,
    hand: [1, 123, 342, 341, 345],
    graveyard: [],
    library: [],
    battlefield: [1, 2, 3],
    isOpponent: true
  }

  $scope.plainswalker = {
    life: 13,
    hand: [342, 341, 345],
    graveyard: [22, 24],
    library: [4,5,6],
    battlefield: [431],
    isOpponent: false
  }

  $scope.draw = function(player) {
  	player.hand.push(player.library.pop())
  }

  $scope.draw($scope.plainswalker);
}]);


myApp.directive('playerBoard', function(){
  return {
    scope: {
      player: "="
    },
    replace: true,
    templateUrl: "player-board.html"
  }
});

myApp.directive('playerInfo', function(){
  return {
    scope: false,
    replace: true,
    templateUrl: "player-info.html"
  }
});





    // link: function(scope, element, attrs) {

    // },