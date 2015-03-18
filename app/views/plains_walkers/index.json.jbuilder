json.array!(@plains_walkers) do |plains_walker|
  json.extract! plains_walker, :id, :name, :password, :avatarUrl
  json.url plains_walker_url(plains_walker, format: :json)
end
