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

  	var player = $scope.currentPlayer;
  	switch ($scope.turnStep) {
  		case 1: // untap
  			player.battlefield.forEach(function(card) {
  				card.isTapped = false;
  			});
  		  break;
  		case 2: // upkeep
  		  break;
  		case 3: // draw
  			$scope.draw(player);
  		  break;
  		case 4: // main
  			$scope.nonInstantsArePlayable = true;
  			player.canPlayLand = true;
  			// TODO: playing a land should set this to false
  		  break;
  		case 5: // attack
  			$scope.nonInstantsArePlayable = false;
  			player.canPlayLand = false;
  		  break;
  		case 6: // block

  		  break;
  		case 7: // damage

  		  break;
  		case 8: // main

  		  break;
  		default: // cleanup
  			$scope.switchPlayers();
  	}
  }

  $scope.draw = function(player) {
  	player.hand.push(player.library.pop())
  }

  $scope.turnStep = 1;
  $scope.nonInstantsArePlayable = false;

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
    isOpponent: true,
    canPlayLand: false
  }

  $scope.plainswalker = {
    life: 13,
    hand: [342, 341, 345],
    graveyard: [22, 24],
    library: [4,5,6],
    battlefield: [
      {id: 120, isTapped: false}
    ],
    isOpponent: false,
    canPlayLand: false
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

myApp.directive('handCard', function(){
  return {
    scope: false,
    replace: true,
    link: function(scope, elem, attrs){
      scope.play = function(){
        // Remove this card from hand.
        scope.player.hand = _.without(scope.player.hand, scope.cardId);

        // Add this card to battlefield,tapped.
        scope.player.battlefield.push({ id: scope.cardId, isTapped: false });
        scope.$apply();
      }

      elem.bind('click', function(e){
        scope.play();
      });
    },
    templateUrl: "hand-card.html"
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

