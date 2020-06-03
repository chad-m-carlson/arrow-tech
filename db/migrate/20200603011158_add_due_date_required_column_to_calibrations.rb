class AddDueDateRequiredColumnToCalibrations < ActiveRecord::Migration[6.0]
  def change
    add_column :calibrations, :due_date_required, :boolean, default: true
  end
end
