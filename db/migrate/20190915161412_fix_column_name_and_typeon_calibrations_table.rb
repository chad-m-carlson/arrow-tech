class FixColumnNameAndTypeonCalibrationsTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :calibrations, :VAV_date_out, :VAC_date_out
    change_column :calibrations, :tolerance, :float
  end
end
