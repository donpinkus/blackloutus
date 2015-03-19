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
	var debounceSearch = _.debounce(function() {
			blockspring.runParsed("magic-the-gathering-card-api", { "card_name": $scope.cardName, "min_mana_cost": 0, "max_mana_cost": 10, "color": null, "primary_type": null, "sub_type": null, "min_power": 0, "max_power": 10, "min_toughness": 0, "max_toughness": 10, "rarity": null, "multiverse_id": null}, function(response){
		    console.log(response);
		    
		    $('.cardsLoading').addClass('hidden');
		    progressBarWidth = 0;
		    $('progress-bar').css('width', progressBarWidth + '%');
				$('.cardResults').removeClass('hidden');

		    $scope.foundCards = response.params.cards;
		    $scope.$apply();
		  });
		},
		300);

	$scope.$watch('cardName', function(){
		// Get all cards with this name
		if ($scope.cardName.length > 2) {
			var progressBarWidth = 0;
			$('.cardsLoading').removeClass('hidden');
			$('.progress-bar').css('width', progressBarWidth + '%');
			$('.cardResults').addClass('hidden');
			setInterval(function(){
				progressBarWidth = progressBarWidth + 10;
				$('.progress-bar').css('width', progressBarWidth + '%');
			}, 160);
			debounceSearch();
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