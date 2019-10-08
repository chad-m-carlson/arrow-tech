class Mutations::DeleteCalibrationRecord < Mutations::BaseMutation
  argument :id, Int, required: true

  field :calibration, Types::CalibrationType, null: true
  field :errors, [String], null: true

  def resolve(id:)
    calibration = Calibration.find(id)
    calibration.destroy

    {
      calibration: calibration,
      errors: []
    }
  end
end