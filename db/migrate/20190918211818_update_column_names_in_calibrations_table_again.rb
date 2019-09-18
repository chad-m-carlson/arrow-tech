class UpdateColumnNamesInCalibrationsTableAgain < ActiveRecord::Migration[6.0]
  def change
    rename_column :calibrations, :EL_pass, :el_pass
    rename_column :calibrations, :VIP_problems, :vip_problems
  end
end
