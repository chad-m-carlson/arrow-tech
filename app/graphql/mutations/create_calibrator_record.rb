class Mutations::CreateCalibratorRecord < Mutations::BaseMutation
  argument :id, ID, required: false
  argument :model, String, required: true
  argument :serial_number, String, required: true
  argument :tfn, String, required: true
  argument :date, String, required: true
  argument :exposure_rate, String, required: true
  argument :batch, Int, required: true

  field :calibrator, Types::CalibratorType, null: true

  def resolve(id:, model:, serial_number:, tfn:, date:, exposure_rate:, batch:)
    if id
      calibrator = Calibrator.find(id)
      calibrator.update(model: model,
                        serial_number: serial_number,
                        tfn: tfn,
                        date: date,
                        exposure_rate: exposure_rate)
      if calibrator.save!
        {
          calibrator: calibrator
        }
      else
        {

        }
      end
    else calibrator = Calibrator.new(model: model,
                                    serial_number: serial_number,
                                    tfn: tfn,
                                    date: date,
                                    exposure_rate: exposure_rate)
      if calibrator.save!
        Calibration.where(batch: batch).update(calibrator_id: calibrator.id)
        {
          calibrator: calibrator
        }
      else
        {

        }
      end
    end
  end
end