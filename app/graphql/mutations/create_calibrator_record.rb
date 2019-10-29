class Mutations::CreateCalibratorRecord < Mutations::BaseMutation
  argument :id, ID, required: false
  argument :model, String, required: true
  argument :serial_number, String, required: true
  argument :tfn, String, required: true
  argument :date, String, required: true
  argument :exposure_rate, String, required: true
  argument :batch, Int, required: true
  argument :dosimeter_model, String, required: true

  field :calibrator, Types::CalibratorType, null: true

  def resolve(id:, model:, serial_number:, tfn:, date:, exposure_rate:, batch:, dosimeter_model:)
    if id
      # ?This updates the calibrator record
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
          errors: calibrator.errors.full_messages
        }
      end
    else 
      # ?This creates a new calibrator based on calibration and dosimeter model
        calibrator = Calibrator.create(model: model,
                                    serial_number: serial_number,
                                    tfn: tfn,
                                    date: date,
                                    exposure_rate: exposure_rate)
      if calibrator.save!
        calibrations = Calibration.where(batch: batch)#.update(calibrator_id: calibrator.id)
        calibrations.each do |c|
          if c.dosimeter.model_number == dosimeter_model
            c.update(calibrator_id: calibrator.id)
          end
        end
        {
          calibrator: calibrator
        }
      else
        {
          errors: calibrator.errors.full_messages
        }
      end
    end
  end
end
