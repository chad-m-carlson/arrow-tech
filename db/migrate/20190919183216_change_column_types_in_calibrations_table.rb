class ChangeColumnTypesInCalibrationsTable < ActiveRecord::Migration[6.0]
  def change
    change_column :calibrations, :el_read, :float
    change_column :calibrations, :acc_read, :float
    change_column :calibrations, :vac_reading, :float
    change_column :calibrations, :vac_ref_reading, :float
  end
end
