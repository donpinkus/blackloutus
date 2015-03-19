myApp.controller('decksIndex', ['$scope', '$http', '$routeParams', 'localStorageService', 'PlainsWalker', 'Deck', function($scope, $http, $routeParams, localStorageService, PlainsWalker, Deck){
  $scope.decks = localStorageService.get('decks');

  // Add meta info to decks

  $scope.decks.forEach(function(deck, i, decks){
    // Mana Proportions
    var manaCounts = _.countBy(deck.cards, function(card){
      return card.colors[0];
    });

    deck.manaProportions = [];

    _.map(manaCounts, function(count, color){
      deck.manaProportions[color] = Math.round((count / deck.cards.length) * 100);
    });

    // Max mana card
    var maxCard = _.max(deck.cards, function(card){
      return card.converted_mana_cost;
    });

    deck.maxCardId = maxCard.multiverse_id;
    console.log(deck.maxCardId);
  });
}]);