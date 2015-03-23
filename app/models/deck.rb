class Deck < ActiveRecord::Base
  belongs_to :plains_walker
  has_many :deck_cards
  has_many :cards, through: :deck_cards

  validates :name, uniqueness: { case_sensitive: false }
  validates :plains_walker_id, presence: true
end