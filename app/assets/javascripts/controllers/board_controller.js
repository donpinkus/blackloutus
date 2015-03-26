myApp.controller('board', ['$scope', '$http', '$routeParams', 'localStorageService', 'PlainsWalker', 'Deck', function($scope, $http, $routeParams, localStorageService, PlainsWalker, Deck){
  $scope.players = {
    me: {
      info: null,
      life: 20,
      deck: null,
      library: null,
      hand: [],
      graveyard: [],
      drawHand: function(){
        for (var i = 0; i < 7; i++) {
          var cardIndex = Math.floor(Math.random() * this.library.length);
          console.log(cardIndex);
          this.hand.push(this.library[cardIndex]);
          this.library.splice(cardIndex, 1);
        }
        this.hand = _.sortBy(this.hand, 'convertedManaCost');
      },
      drawCard: function(){
        this.hand.push(this.library.pop());
      },
      playCard: function(){

      },
      tapCard: function(){

      },
      buryCard: function(){

      }
    },
    opponent: {
      info: null,
      life: 20,
      deck: null,
      library: null,
      hand: [],
      graveyard: []
    }
  };

  $scope.game = {
    playersConnected: false,
    ready: false,
    turn: {
      step: null,
      player: null
    }
  };
  
  var socket = io('localhost:5000');

  socket.on('both players connected', function(msg){
    $scope.game.playersConnected = true;
    
    var plainsWalkerId = localStorageService.get('plains_walker').id;

    PlainsWalker.get(plainsWalkerId).then(function(currentUser){
      $scope.players.me.info = currentUser;
      
      Deck.get($routeParams["deck"]).then(function(deck){
        console.log(deck);
        $scope.players.me.deck = deck;
        $scope.players.me.library = deck.cards;
        $scope.players.me.drawHand();

        console.log($scope.players);

        socket.emit('player info', $scope.players.me);
      });
    });
  });

  socket.on('player info', function(opponent){
    // Set opponent to this player.
    $scope.players.opponent.info = opponent.info;
    $scope.players.opponent.library = opponent.library;
    $scope.players.opponent.hand = opponent.hand;
    $scope.players.opponent.graveyard = [];

    $scope.game.ready = true;

    $scope.$apply();
  });

  socket.on('next turn step', function(msg){
    $scope.handleNextStep();
  });

  socket.on('broad test', function(msg){
    console.log('broadcasted');
  })
}]);
