class Mutations::CreateCalibratorRecord < Mutations::BaseMutation
  argument :id, ID, required: false
  argument :model, String, required: true
  argument :serial_number, String, required: true
  argument :tfn, String, required: true
  argument :date, String, required: true
  argument :exposure_rate, String, required: true
  argument :batch, Int, required: true
  argument :certificate_number,String, required: true
  argument :dosimeter_model, String, required: true

  field :calibrator, Types::CalibratorType, null: true

  def resolve(id:, model:, serial_number:, tfn:, date:, exposure_rate:, batch:, dosimeter_model:, certificate_number:)
    if id
      # ?This updates the calibrator record
      calibrator = Calibrator.find(id)
      begin
        calibrator.update!(model: model,
                          serial_number: serial_number,
                          tfn: tfn,
                          date: date,
                          exposure_rate: exposure_rate)
        update_calibrations(calibrator, batch, certificate_number, dosimeter_model)
        { calibrator: calibrator }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
    else 
      # ?This creates a new calibrator based on calibration and dosimeter model
      begin
        calibrator = Calibrator.create!(model: model,
                                       serial_number: serial_number,
                                       tfn: tfn,
                                       date: date,
                                       exposure_rate: exposure_rate)
        update_calibrations(calibrator,
                            batch,
                            certificate_number,
                            dosimeter_model)
        { calibrator: calibrator }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
    end
  end

  def update_calibrations(calibrator, batch, certificate_number, dosimeter_model)
    return unless calibrator.save

    calibrations = Calibration.where(batch: batch, certificate_number: certificate_number)#.update(calibrator_id: calibrator.id)
    calibrations.each do |c|
      if c.dosimeter.model_number == dosimeter_model

        c.update(calibrator_id: calibrator.id)
      end
    end
  end

end
