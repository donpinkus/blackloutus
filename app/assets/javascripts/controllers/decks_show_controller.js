myApp.controller('decksShow', 
	['$scope', '$http', '$routeParams', '$location', 'localStorageService', 'PlainsWalker', 'Deck', 'DeckService', 
	function($scope, $http, $routeParams, $location, localStorageService, PlainsWalker, Deck, DeckService){

	$scope.currentUser = localStorageService.get('plains_walker');

  // Set Deck. If ID param is set, get the deck, if not create a blank deck.
  var deckId = $routeParams["id"];

  $scope.uniqueCountedDeckCards = [];

  if (deckId) {
  	Deck.get(deckId).then(function(deck){
			$scope.deck = deck;

			setUniqueCountedDeckCards();
		});
  } else {
  	$scope.deck = new Deck({ 
  		id: null, 
  		name: "Untitled Deck", 
  		cards: [], 
  		plains_walker_id: $scope.currentUser.id 
  	});

  	setUniqueCountedDeckCards();
  }

	// Used in search
	$scope.cardName = "";
	$scope.foundCards = [];
	
	/* Search */
	$scope.$watch('cardName', function(){
		// Get all cards with this name
		if ($scope.cardName.length > 2) {
			$http.get('/api/cards.json?name=' + $scope.cardName).then(function(results){
				// this is to remove angular's $$hashkey from each object, so that _.uniq() works,
				// since $scope.deck on load does not have any $$hashkey.
				results = JSON.parse(angular.toJson(results));
				$scope.foundCards = results.data;
			});
		}
	});

	$scope.addToDeck = function(card){
		console.log(card);
		try { 
			card.colors = JSON.parse(card.colors);
		} catch(e) { 
			console.log('colors already parsed'); 
		}

		$scope.deck.cards.push(card);
		$scope.deck.cards = _.sortBy($scope.deck.cards, 'convertedManaCost');

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
		if ($scope.deck.id) {
			$scope.deck.update();
		} else {
			$scope.deck.create();
		}
		

		$location.path('/deck_editor');
	}
}]);




