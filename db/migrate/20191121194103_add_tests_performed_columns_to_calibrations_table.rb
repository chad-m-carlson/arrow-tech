class AddTestsPerformedColumnsToCalibrationsTable < ActiveRecord::Migration[6.0]
  def change
    add_column :calibrations, :el_test_performed, :boolean
    add_column :calibrations, :acc_test_performed, :boolean
    add_column :calibrations, :vac_test_performed, :boolean
    add_column :calibrations, :vip_test_performed, :boolean
    change_column_default :calibrations, :el_pass, nil 
    change_column_default :calibrations, :acc_pass, nil 
    change_column_default :calibrations, :vip_pass, nil 
    change_column_default :calibrations, :vac_pass, nil 

  end
end
