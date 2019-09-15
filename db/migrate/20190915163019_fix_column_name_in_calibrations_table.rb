class FixColumnNameInCalibrationsTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :calibrations, :certficate_number, :certificate_number
  end
end
