myApp.controller('board', ['$scope', '$http', function($scope, $http){
  console.log('home controller loaded!');
  
  // TODO add some conditional for environment
  var socket = io('black-lotus-sockets.herokuapp.com');
  socket.emit('chat message', 'HERRO! from black lotus.');

  socket.on('chat message', function(msg){
    console.log(msg);
  });

  socket.on('next turn step', function(msg){
    console.log('next turn step received');
    console.log(msg);

    $scope.handleNextStep();
  });


  $scope.drawHand = function() {
    for (var i = 0; i < 7; i++) {
      var cardIndex = Math.floor(Math.random() * $scope.plainswalker.library.length)
      $scope.plainswalker.hand.push($scope.plainswalker.library[cardIndex]);
      $scope.plainswalker.library.splice(cardIndex, 1);
    }
    $scope.plainswalker.hand = sortHand($scope.plainswalker.hand);
  }

  // TODO: attach this to a "hand" object.
  function sortHand(hand) {
    var hand = _.sortBy(hand, 'converted_mana_cost');
    return hand;
  }

  // TODO: attach this to a "turn" object.
  $scope.switchPlayers = function() {
  	$scope.currentPlayer = $scope.currentPlayer == $scope.opponent
			? $scope.plainswalker
			: $scope.opponent;
  }

  $scope.emitNextStep = function() {
    socket.emit('next turn step', true);
  }

  $scope.handleNextStep = function(){
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

    $scope.$apply();
  }

  $scope.draw = function(player) {
  	player.hand.push(player.library.pop())
  }

  $scope.turnStep = 1;

  // TODO: Maybe we should have a canPlay(turn, turnStep, player.manaPool, card); function... not sure
  //
  // Turn has info about whether lands have been played
  // TurnStep has info about the "types" that can be played
  // player.manaPool checks whether there is enough mana to play the card
  // Card is needed for the info
  $scope.nonInstantsArePlayable = false;

  $scope.opponent = {
    life: 20,
    hand: [],
    graveyard: [],
    library: [],
    battlefield: [],
    isOpponent: true,
    canPlayLand: false,
    manaPool: {
      white: 0,
      green: 0,
      black: 0,
      red: 0,
      blue: 0,
      colorless: 0
    }
  }

  $scope.plainswalker = {
    life: 20,
    hand: [],
    graveyard: [],
    library: [],
    battlefield: [],
    isOpponent: false,
    canPlayLand: false,
    manaPool: {
      white: 0,
      green: 0,
      black: 0,
      red: 0,
      blue: 0,
      colorless: 0
    }
  }

  // Example of setting Angular variable from Ajax.
  $http.get('/api/decks/1').then(function(response){
    var deck = response.data;
    $scope.plainswalker.library = deck;

    $scope.drawHand();
  });


  $scope.currentPlayer = $scope.opponent;
}]);
