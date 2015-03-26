myApp.controller('decksIndex', ['$scope', '$http', '$routeParams', 'localStorageService', 'PlainsWalker', 'Deck', 'DeckService', function($scope, $http, $routeParams, localStorageService, PlainsWalker, Deck, DeckService){
  $scope.currentUser = localStorageService.get('plains_walker');

  Deck.query({plains_walker_id: $scope.currentUser.id}).then(function(decks){
    $scope.decks = decks;

    // Add meta info to decks
    $scope.decks.forEach(function(deck, i, decks){
      // Max mana card
      var maxCard = _.max(deck.cards, function(card){
        return card.convertedManaCost;
      });

      deck.maxCardId = maxCard.multiverseId;
    });
  });
}]);