class CreateDeckCards < ActiveRecord::Migration
  def change
    create_table :deck_cards do |t|
      t.references :deck, index: true
      t.references :card, index: true

      t.timestamps
    end
  end
end
