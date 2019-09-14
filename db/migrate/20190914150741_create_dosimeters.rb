class CreateDosimeters < ActiveRecord::Migration[6.0]
  def change
    create_table :dosimeters do |t|
      t.string :model_number
      t.string :serial_number
      t.integer :range
      t.boolean :is_mR
      t.boolean :is_R
      t.belongs_to :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
