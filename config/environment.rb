# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# Let's camelcase all JSON, so it's consistent with Angular Rails Resource. might be bad idea.
Jbuilder.key_format camelize: :lower
