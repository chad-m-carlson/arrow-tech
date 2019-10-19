class CreateCalibrators < ActiveRecord::Migration[6.0]
  def change
    create_table :calibrators do |t|
      t.string :model
      t.string :serial_number
      t.string :exposure_rate
      t.string :tfn
      t.string :date

      t.timestamps
    end
    add_reference :calibrations, :calibrator, index: true
  end
end
