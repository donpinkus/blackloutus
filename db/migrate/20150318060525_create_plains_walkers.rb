class CreatePlainsWalkers < ActiveRecord::Migration
  def change
    create_table :plains_walkers do |t|
      t.string :name
      t.string :password
      t.text :avatarUrl

      t.timestamps
    end
  end
end
