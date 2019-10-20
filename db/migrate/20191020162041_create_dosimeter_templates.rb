class CreateDosimeterTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :dosimeter_templates do |t|
      t.string :model_number
      t.string :serial_number
      t.integer :range
      t.boolean :is_mr
      t.boolean :is_r
      t.boolean :is_sv
      t.boolean :is_msv

      t.timestamps
    end
  end
end
