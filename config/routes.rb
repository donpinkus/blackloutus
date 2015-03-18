Rails.application.routes.draw do
  resources :decks

  resources :plains_walkers

	get '/api/decks/:id', to: 'home#get_deck'
	get '/api/cards/:id', to: "home#get_card"
	get '/api/cards', to: "home#get_all_cards"

  root 'home#index'
end



# For Louie's (the person) pleasure. 
# Run '$ rake routes' in your terminal to see all routes also.

# RESTful

# get all     GET '/api/cards'
# get one     GET '/api/cards/:id'

# create one  POST '/api/cards'
# update one  PUT  '/api/cards/:id'
# delete one  DELETE '/api/cards/:id'