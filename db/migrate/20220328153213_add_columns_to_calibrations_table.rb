class AddColumnsToCalibrationsTable < ActiveRecord::Migration[6.0]
  def change 
    add_column :calibrations, :el_units_in_mr, :boolean, default: false
  end
end