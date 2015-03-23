json.array!(@cards) do |card|
  json.extract! card, :id, :multiverse_id, :related_card_id, :set_number, :name, :search_name, :description, :flavor, :colors, :mana_cost, :converted_mana_cost, :card_set_name, :primary_type, :sub_type, :power, :toughness, :loyalty, :rarity, :artist, :card_set_id, :token, :promo, :rulings, :formats, :released_at, :created_at, :updated_at
end



