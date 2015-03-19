myApp.controller('decksShow', ['$scope', '$http', '$routeParams', 'localStorageService', 'PlainsWalker', 'Deck', function($scope, $http, $routeParams, localStorageService, PlainsWalker, Deck){
	// Deck.get($routeParams.id).then(function(deck){
	// 	$scope.deck = deck;
	// });

	$scope.deckCards = localStorageService.get('deck') || [];
	$scope.uniqueCountedDeckCards = [];

	// Used in search
	$scope.cardName = "";
	$scope.foundCards = [];
	
	/* Search */
	$scope.$watch('cardName', function(){
		// Get all cards with this name
		if ($scope.cardName.length > 2) {
			$http.get('/api/cards?name=' + $scope.cardName).then(function(response){
				$scope.foundCards = response.data;
			});
		}
	});

	$scope.addToDeck = function(card){
		try { 
			card.colors = JSON.parse(card.colors);
		} catch(e) { console.log('colors already parsed'); }

		$scope.deckCards.push(card);

		$scope.deckCards = _.sortBy($scope.deckCards, 'converted_mana_cost');
	}


	/* Deck cards */
	function updateUniqueCountedDeckCards() {
		// Get the unique cards
		var uniqueDeckCards = _.uniq($scope.deckCards, false, function(card){
			return card.id;
		});

		// Get the card counts
		var cardCounts = _.countBy($scope.deckCards, function(card){
			return card.id;
		});

		// Merge
		$scope.uniqueCountedDeckCards = _.map(uniqueDeckCards, function(card){
			var card_id = card.id;
			card.count = cardCounts[card_id];
			return card;
		});

		console.log($scope.uniqueCountedDeckCards);
	}

	$scope.removeCardFromDeck = function(index){
		$scope.deckCards.splice(index, 1);
		updateUniqueCountedDeckCards();
	}

	$scope.saveDeck = function(){
		localStorageService.set('deck', $scope.deckCards)
	}

	$scope.$watch('deckCards',function(){
		updateUniqueCountedDeckCards();
	});
}]);