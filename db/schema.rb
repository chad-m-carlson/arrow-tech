# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_17_160432) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calibrations", force: :cascade do |t|
    t.bigint "dosimeter_id", null: false
    t.bigint "user_id", null: false
    t.float "tolerance", default: 0.1, null: false
    t.datetime "date_received"
    t.datetime "el_date_in"
    t.datetime "el_date_out"
    t.datetime "acc_date"
    t.datetime "vac_date_in"
    t.datetime "vac_date_out"
    t.datetime "final_date"
    t.datetime "ship_back_date"
    t.datetime "due_date"
    t.boolean "el_pass"
    t.boolean "vip_pass"
    t.boolean "vac_pass"
    t.boolean "acc_pass"
    t.boolean "final_pass", default: false
    t.float "el_read"
    t.float "acc_read"
    t.string "vip_problems"
    t.float "vac_reading"
    t.float "vac_ref_reading"
    t.string "certificate_number"
    t.integer "batch"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "calibrator_id"
    t.boolean "vac_required", default: true
    t.string "tech_first_name"
    t.string "tech_last_name"
    t.boolean "el_test_performed"
    t.boolean "acc_test_performed"
    t.boolean "vac_test_performed"
    t.boolean "vip_test_performed"
    t.boolean "due_date_required", default: true
    t.index ["calibrator_id"], name: "index_calibrations_on_calibrator_id"
    t.index ["dosimeter_id"], name: "index_calibrations_on_dosimeter_id"
    t.index ["user_id"], name: "index_calibrations_on_user_id"
  end

  create_table "calibrator_certs", force: :cascade do |t|
    t.string "tfn"
    t.string "date"
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "calibrator_models", force: :cascade do |t|
    t.string "model"
    t.boolean "inactive"
    t.bigint "calibrator_cert_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["calibrator_cert_id"], name: "index_calibrator_models_on_calibrator_cert_id"
  end

  create_table "calibrators", force: :cascade do |t|
    t.string "model"
    t.string "serial_number"
    t.string "exposure_rate"
    t.string "tfn"
    t.string "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "street_address_1"
    t.string "street_address_2"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "country"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
  end

  create_table "dosimeter_templates", force: :cascade do |t|
    t.string "model_number"
    t.string "serial_number"
    t.integer "range"
    t.boolean "is_mr", default: false
    t.boolean "is_r", default: false
    t.boolean "is_sv", default: false
    t.boolean "is_msv", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "dosimeters", force: :cascade do |t|
    t.string "model_number"
    t.string "serial_number"
    t.integer "range"
    t.boolean "is_mr", default: false
    t.boolean "is_r", default: false
    t.bigint "customer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_sv", default: false
    t.boolean "is_msv", default: false
    t.index ["customer_id"], name: "index_dosimeters_on_customer_id"
  end

  create_table "exposure_rates", force: :cascade do |t|
    t.string "value"
    t.boolean "is_r", default: false
    t.boolean "is_mr", default: false
    t.boolean "is_sv", default: false
    t.boolean "is_msv", default: false
    t.boolean "inactive"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "first_name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.integer "sign_in_count", default: 0, null: false
    t.boolean "is_admin", default: false
    t.string "last_name"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "calibrations", "dosimeters"
  add_foreign_key "calibrations", "users"
  add_foreign_key "calibrator_models", "calibrator_certs"
  add_foreign_key "dosimeters", "customers"
end
