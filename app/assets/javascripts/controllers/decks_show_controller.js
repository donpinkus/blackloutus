myApp.controller('decksShow', 
	['$scope', '$http', '$routeParams', '$location', 'localStorageService', 'PlainsWalker', 'Deck', 'DeckService', 
	function($scope, $http, $routeParams, $location, localStorageService, PlainsWalker, Deck, DeckService){

	$scope.currentUser = localStorageService.get('plains_walker');

  // Set Deck. If ID param is set, get the deck, if not create a blank deck.
  var deckId = $routeParams["id"];

  // If a deck exists, then update it on save. If a deck did not exist, then create it on save.
  var isDeckUpdate = null;

  if (deckId) {
  	Deck.get(deckId).then(function(deck){
			$scope.deck = deck;
		});
  } else {
  	$scope.deck = new Deck { id: null, name: "Untitled Deck", cards: [], plains_walker_id: $scope.currentUser.id };
  }

  // Initialize an array that is used for the sidebar showing card counts. Then set it.
  $scope.uniqueCountedDeckCards = [];
  setUniqueCountedDeckCards();

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

		setUniqueCountedDeckCards();
	}


	/* Deck cards */
	function setUniqueCountedDeckCards() {
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

		setUniqueCountedDeckCards();
	}

	$scope.saveDeck = function(){
		DeckService.save($scope.deck);
		$location.path('/deck_editor');
	}
}]);




