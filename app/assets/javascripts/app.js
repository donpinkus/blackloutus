var myApp = angular.module('myApp', ['templates', 'ngRoute', 'ui.bootstrap', 'rails', 'selectize', 'LocalStorageModule']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/deck_editor', {
      templateUrl: 'pages/decks/index.html',
      controller: 'decksIndex'
    })
    .when('/deck_editor/new', {
      templateUrl: 'pages/decks/show.html',
      controller: 'decksShow'
    })
    .when('/deck_editor/:id', {
      templateUrl: 'pages/decks/show.html',
      controller: 'decksShow'
    })
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'board'
    });
}]);

myApp.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
  // Localhost needs '' on chrome.
  var cookieDomain = window.location.origin == "http://localhost:3000" ? "" : window.location;

  localStorageServiceProvider
    .setPrefix('blacklotusclub')
    .setStorageCookie(0, '/')
    .setStorageCookieDomain(cookieDomain)
    .setNotify(true, true);
}]);

myApp.factory('PlainsWalker', ['railsResourceFactory', function (railsResourceFactory) {
  return railsResourceFactory({
    url: '/plains_walkers',
    name: 'plainsWalker'
  });
}]);

myApp.factory('Deck', ['railsResourceFactory', function (railsResourceFactory) {
  return railsResourceFactory({
    url: '/decks',
    name: 'deck'
  });
}]);