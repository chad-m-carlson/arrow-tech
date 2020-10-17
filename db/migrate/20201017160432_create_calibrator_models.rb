class CreateCalibratorModels < ActiveRecord::Migration[6.0]
  def change
    create_table :calibrator_models do |t|
      t.string :model
      t.boolean :inactive
      t.belongs_to :calibrator_cert, null: false, foreign_key: true

      t.timestamps
    end
  end
end
