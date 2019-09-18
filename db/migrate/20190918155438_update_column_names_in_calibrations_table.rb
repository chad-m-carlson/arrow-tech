class UpdateColumnNamesInCalibrationsTable < ActiveRecord::Migration[6.0]
  def change
    rename_column :calibrations, :EL_date_in, :el_date_in
    rename_column :calibrations, :EL_date_out, :el_date_out
    rename_column :calibrations, :ACC_date, :acc_date
    rename_column :calibrations, :VAC_date_in, :vac_date_in
    rename_column :calibrations, :VAC_date_out, :vac_date_out
    rename_column :calibrations, :VIP_pass, :vip_pass
    rename_column :calibrations, :VAC_pass, :vac_pass
    rename_column :calibrations, :ACC_pass, :acc_pass
    rename_column :calibrations, :EL_read, :el_read
    rename_column :calibrations, :ACC_read, :acc_read
    rename_column :calibrations, :VAC_reading, :vac_reading
    rename_column :calibrations, :VAC_ref_reading, :vac_ref_reading

  end
end
