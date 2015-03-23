class CardsController < ApplicationController
	def index
		if params[:name]
			@cards = Card.where("name LIKE '%" + params[:name] + "%' ")
		else
			@cards = Card.limit(100)
		end
	end
end