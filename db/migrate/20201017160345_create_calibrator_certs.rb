class CreateCalibratorCerts < ActiveRecord::Migration[6.0]
  def change
    create_table :calibrator_certs do |t|
      t.string :tfn
      t.string :date
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
