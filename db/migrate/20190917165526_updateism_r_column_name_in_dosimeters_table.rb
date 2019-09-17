class UpdateismRColumnNameInDosimetersTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :dosimeters, :is_R, :is_r
    rename_column :dosimeters, :is_mR, :is_mr
    change_column_default :calibrations, :tolerance, 0.1
  end
end
