require 'open-uri'


# Card ids
path = "http://api.mtgdb.info/cards/?fields=id"
buffer = open(path).read

card_ids_nested = JSON.parse buffer

card_ids = []
card_ids_nested.each do |card_id_pair|
  card_ids << card_id_pair["id"]
end

max_card_id = card_ids.max

# In case this task fails part way through, start from the highgest ID.
if Card.first
	starting_card_multiverse_id = Card.maximum(:multiverse_id).next
else
	starting_card_multiverse_id = 1
end

# Just some logging...
puts "Initial card_id is: "
puts card_id

# GIT IT
card_ids.each do |card_multiverse_id|
  if Card.find_by_multiverse_id(card_multiverse_id)
    puts "Card already exists in DB: "
    puts card_multiverse_id
    next
  end

	path = "http://api.mtgdb.info/cards/#{card_multiverse_id}"
	buffer = open(path).read

	c = JSON.parse(buffer)

	card = Card.new
  card.multiverse_id = c["id"]
  card.related_card_id = c["relatedCardId"]
  card.set_number = c["setNumber"]
  card.name = c["name"]
  card.search_name = c["searchName"]
  card.description = c["description"]
  card.flavor = c["flavor"]
  card.colors = c["colors"].to_s
  card.mana_cost = c["manaCost"]
  card.converted_mana_cost = c["convertedManaCost"]
  card.card_set_name = c["cardSetName"]
  card.primary_type = c["type"]
  card.sub_type = c["subType"]
  card.power = c["power"]
  card.toughness = c["toughness"]
  card.loyalty = c["loyalty"]
  card.rarity = c["rarity"]
  card.artist = c["artist"]
  card.card_set_id = c["cardSetId"]
  card.token = c["token"]
  card.promo = c["promo"]
  card.rulings = c["rulings"].to_s
  card.formats = c["formats"].to_s
  card.released_at = c["releasedAt"]

  # Write to db
  card.save

  puts c["id"]
  puts c["name"]
  puts "card saved"
end

