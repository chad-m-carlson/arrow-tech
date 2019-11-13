class AddNameColumnToCalibrations < ActiveRecord::Migration[6.0]
  def change
    add_column :calibrations, :tech_first_name, :string
    add_column :calibrations, :tech_last_name, :string
  end
end
