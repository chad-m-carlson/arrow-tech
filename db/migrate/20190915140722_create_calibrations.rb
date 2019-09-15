class CreateCalibrations < ActiveRecord::Migration[6.0]
  def change
    create_table :calibrations do |t|
      t.belongs_to :dosimeter, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :tolerance, null: false, default: 0.1
      t.datetime :date_received 
      t.datetime :EL_date_in 
      t.datetime :EL_date_out
      t.datetime :ACC_date
      t.datetime :VAC_date_in
      t.datetime :VAV_date_out
      t.datetime :final_date
      t.datetime :ship_back_date
      t.datetime :due_date
      t.boolean :EL_pass, default: true
      t.boolean :VIP_pass, default: true
      t.boolean :VAC_pass, default: true
      t.boolean :ACC_pass, default: false
      t.boolean :final_pass, default: false
      t.integer :EL_read
      t.integer :ACC_read
      t.string :VIP_problems
      t.integer :VAC_reading
      t.integer :VAC_ref_reading
      t.string :certficate_number
      t.integer :batch

      t.timestamps
    end
    add_column :customers, :email, :string
  end
end
