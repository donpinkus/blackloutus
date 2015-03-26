json.array!(@decks) do |deck|
  json.extract! deck, :id, :name, :description, :plains_walker_id
  json.cards deck.cards
  json.url deck_url(deck, format: :json)
end
