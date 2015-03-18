# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150318071703) do

  create_table "cards", force: true do |t|
    t.integer  "multiverse_id"
    t.integer  "related_card_id"
    t.integer  "set_number"
    t.string   "name"
    t.string   "search_name"
    t.text     "description"
    t.text     "flavor"
    t.string   "colors"
    t.string   "mana_cost"
    t.integer  "converted_mana_cost"
    t.string   "card_set_name"
    t.string   "primary_type"
    t.string   "sub_type"
    t.integer  "power"
    t.integer  "toughness"
    t.integer  "loyalty"
    t.string   "rarity"
    t.string   "artist"
    t.string   "card_set_id"
    t.boolean  "token"
    t.boolean  "promo"
    t.text     "rulings"
    t.text     "formats"
    t.date     "released_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "deck_cards", force: true do |t|
    t.integer  "deck_id"
    t.integer  "card_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "deck_cards", ["card_id"], name: "index_deck_cards_on_card_id"
  add_index "deck_cards", ["deck_id"], name: "index_deck_cards_on_deck_id"

  create_table "decks", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "plains_walker_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "decks", ["plains_walker_id"], name: "index_decks_on_plains_walker_id"

  create_table "plains_walkers", force: true do |t|
    t.string   "name"
    t.string   "password"
    t.text     "avatarUrl"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
