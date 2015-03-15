class HomeController < ApplicationController
  def index
  end

  # API routes
  def get_card
  	render json: Card.find(params[:id])
  end

  def get_all_cards
  	render json: Card.all
  end
end
