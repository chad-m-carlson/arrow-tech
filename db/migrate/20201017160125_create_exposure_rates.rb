class CreateExposureRates < ActiveRecord::Migration[6.0]
  def change
    create_table :exposure_rates do |t|
      t.string :value
      t.boolean :is_r, :default => false
      t.boolean :is_mr, :default => false
      t.boolean :is_sv, :default => false
      t.boolean :is_msv, :default => false
      t.boolean :inactive

      t.timestamps
    end
  end
end
