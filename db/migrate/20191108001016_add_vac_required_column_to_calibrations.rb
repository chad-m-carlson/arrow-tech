class AddVacRequiredColumnToCalibrations < ActiveRecord::Migration[6.0]
  def change
    add_column :calibrations, :vac_required, :boolean, default: true
  end
end
