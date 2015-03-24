class AddLastUsedToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :last_used, :datetime
  end
end
