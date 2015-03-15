raw_cards = [
  {
    "name"=> "Basalt Monolith",
    "mana_cost"=> "3",
    "card_type"=> "Artifact",
    "card_text" =>  "Basalt Monolith doesn't untap during your untap step.",
    "expansion" =>  {
      "href" =>  "http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&set=[%22Limited Edition Alpha%22]",
      "text" =>  "Limited Edition Alpha"
    },
    "rarity" =>  "null",
    "community_rating" =>  "3.811",
    "community_votes" =>  "53",
    "card_image" =>  {
      "alt" =>  "Basalt Monolith",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2&type=card",
      "text" =>  ""
    },
    "mana_cost_img" =>  {
      "alt" =>  "3",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=3&type=symbol",
      "text" =>  ""
    }
  },
  {
    "name" =>  "Black Lotus",
    "mana_cost" =>  "0",
    "card_type" =>  "Artifact",
    "card_text" =>  "Sacrifice Black Lotus: Add three mana of any one color to your mana pool.",
    "expansion" =>  {
      "href" =>  "http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&set=[%22Limited Edition Alpha%22]",
      "text" =>  "Limited Edition Alpha"
    },
    "rarity" =>  "Rare",
    "community_rating" =>  "4.749",
    "community_votes" =>  "398",
    "card_image" =>  {
      "alt" =>  "Black Lotus",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=3&type=card",
      "text" =>  ""
    },
    "mana_cost_img" =>  {
      "alt" =>  "0",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=0&type=symbol",
      "text" =>  ""
    }
  },
  {
    "name" =>  "Black Vise",
    "mana_cost" =>  "1",
    "card_type" =>  "Artifact",
    "card_text" =>  "As Black Vise enters the battlefield, choose an opponent.",
    "expansion" =>  {
      "href" =>  "http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&set=[%22Limited Edition Alpha%22]",
      "text" =>  "Limited Edition Alpha"
    },
    "rarity" =>  "null",
    "community_rating" =>  "4.606",
    "community_votes" =>  "66",
    "card_image" =>  {
      "alt" =>  "Black Vise",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=4&type=card",
      "text" =>  ""
    },
    "mana_cost_img" =>  {
      "alt" =>  "1",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=1&type=symbol",
      "text" =>  ""
    }
  },


  {
    "name" =>  "Celestial Prism",
    "mana_cost" =>  "3",
    "card_type" =>  "Artifact",
    "card_text" =>  "Add one mana of any color to your mana pool.",
    "expansion" =>  {
      "href" =>  "http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&set=[%22Limited Edition Alpha%22]",
      "text" =>  "Limited Edition Alpha"
    },
    "rarity" =>  "null",
    "community_rating" =>  "1.197",
    "community_votes" =>  "61",
    "card_image" =>  {
      "alt" =>  "Celestial Prism",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=5&type=card",
      "text" =>  ""
    },
    "mana_cost_img" =>  {
      "alt" =>  "3",
      "src" =>  "http://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=3&type=symbol",
      "text" =>  ""
    }
  }
]

# Convert colons to ROCKETS   - Elon Musk
# convert null to "null"  - Sartre


raw_cards.each do |raw_card|
  
  card = Card.new
  card.name = raw_card["name"]
  card.mana_cost = raw_card["mana_cost"]
  card.mana_cost_img_src = raw_card["mana_cost_img"]["src"]
  card.card_type = raw_card["card_type"]
  card.card_text = raw_card["card_text"]
  card.expansion_href = raw_card["expansion"]["href"]
  card.expansion_name = raw_card["expansion"]["text"]
  card.community_rating = raw_card["community_rating"]
  card.community_votes = raw_card["community_votes"]
  card.card_image_alt = raw_card["card_image"]["alt"]
  card.card_image_src = raw_card["card_image"]["src"]

  # Write to db
  card.save
end




