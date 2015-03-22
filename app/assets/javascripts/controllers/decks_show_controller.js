myApp.controller('decksShow', ['$scope', '$http', '$routeParams', '$location', 'localStorageService', 'PlainsWalker', 'Deck', 'DeckService', function($scope, $http, $routeParams, $location, localStorageService, PlainsWalker, Deck, DeckService){
	$scope.currentUser = localStorageService.get('plains_walker');
	var deckId = $routeParams["id"];

  // Set Deck. If ID param is set, get the deck, if not create a blank deck.
  if (deckId) {
  	Deck.get(deckId).then(function(deck){
			$scope.deck = deck;
		});
  } else {
  	$scope.deck = { id: null, name: "Untitled Deck", cards: [] };
  }

  $scope.uniqueCountedDeckCards = [];
  updateUniqueCountedDeckCards();

	// Used in search
	$scope.cardName = "";
	$scope.foundCards = [];
	
	/* Search */
	$scope.$watch('cardName', function(){
		// Get all cards with this name
		if ($scope.cardName.length > 2) {
			$http.get('/api/cards?name=' + $scope.cardName).then(function(results){
				$scope.foundCards = results.data;
			});
		}
	});

	$scope.addToDeck = function(card){
		try { 
			card.colors = JSON.parse(card.colors);
		} catch(e) { 
			console.log('colors already parsed'); 
		}

		$scope.deck.cards.push(card);
		$scope.deck.cards = _.sortBy($scope.deck.cards, 'converted_mana_cost');

		updateUniqueCountedDeckCards();
	}


	/* Deck cards */
	function updateUniqueCountedDeckCards() {
		// Get the unique cards
		var uniqueDeckCards = _.uniq($scope.deck.cards, false, function(card){
			return card.id;
		});

		// Get the card counts
		var cardCounts = _.countBy($scope.deck.cards, function(card){
			return card.id;
		});

		// Merge
		$scope.uniqueCountedDeckCards = _.map(uniqueDeckCards, function(card){
			card.count = cardCounts[card.id];
			return card;
		});
	}

	$scope.removeCardFromDeck = function(cardToRemove){
		// Find card in deck.
		for (i = 0; i < $scope.deck.cards.length; i++) {
			if ($scope.deck.cards[i].id == cardToRemove.id) {
				$scope.deck.cards.splice(i, 1);
				break;
			}
		}

		updateUniqueCountedDeckCards();
	}

	$scope.saveDeck = function(){
		DeckService.save($scope.deck);
		$location.path('/deck_editor');
	}
}]);




