class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string :name
      t.text :description
      t.references :plains_walker, index: true

      t.timestamps
    end
  end
end
