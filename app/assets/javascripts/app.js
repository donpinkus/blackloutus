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

  $scope.switchPlayers = function() {
  	$scope.currentPlayer = $scope.currentPlayer == $scope.opponent
			? $scope.plainswalker
			: $scope.opponent;
  }

  $scope.nextStep = function() {
  	$scope.turnStep = $scope.turnStep == 9 ? 1 : $scope.turnStep + 1;
  	// Check if current step is draw phase. if so make them draw.

  	// figure out a way to track which players step's we're going through
  }

  $scope.draw = function(player) {
  	player.hand.push(player.library.pop())
  }

  $scope.turnStep = 1;

  $scope.opponent = {
    life: 20,
    hand: [1, 123, 342, 341, 345],
    graveyard: [],
    library: [],
    battlefield: [
      {id: 34, isTapped: false},
      {id: 190, isTapped: true},
      {id: 760, isTapped: false}
    ],
    isOpponent: true
  }

  $scope.plainswalker = {
    life: 13,
    hand: [342, 341, 345],
    graveyard: [22, 24],
    library: [4,5,6],
    battlefield: [
      {id: 120, isTapped: false}
    ],
    isOpponent: false
  }

  $scope.currentPlayer = $scope.opponent;

  $scope.draw($scope.plainswalker);

  $scope.switchPlayers();
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

myApp.directive('hand', function(){
  return {
    scope: false,
    replace: true,
    templateUrl: "hand.html"
  }
});

myApp.directive('battleFieldCard', function(){
  return {
    scope: {
      card: "="
    },
    replace: true,
    link: function(scope, elem, attrs) {
      scope.tap = function(){
        scope.card.isTapped = !scope.card.isTapped;
        scope.$apply();
      };

      // Tap & untap on click.
      elem.bind('click', function(e){
        scope.tap();
      });
    },
    templateUrl: "battle-field-card.html"
  }
})





    // link: function(scope, element, attrs) {

    // },