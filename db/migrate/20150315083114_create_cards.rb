class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :mana_cost
      t.text :mana_cost_img_src
      t.string :card_type
      t.text :card_text
      t.text :expansion_href
      t.string :expansion_name
      t.float :community_rating
      t.integer :community_votes
      t.string :card_image_alt
      t.text :card_image_src

      t.timestamps
    end
  end
end
