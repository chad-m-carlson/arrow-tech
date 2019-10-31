class Mutations::CreateCalibrationRecord < Mutations::BaseMutation
  argument :id, ID, required: false
  argument :user_id, ID, required: false
  argument :dosimeter_id, ID, required: false
  # argument :tolerance, Int, required: false
  argument :date_received, String, required: false
  argument :el_date_in, String, required: false
  argument :el_date_out, String, required: false
  argument :acc_date, String, required: false
  argument :vac_date_in, String, required: false
  argument :vac_date_out, String, required: false
  argument :final_date, String, required: false
  # argument :ship_back_date, String, required: false
  argument :due_date, String, required: false
  argument :el_pass, Boolean, required: false
  argument :vip_pass, Boolean, required: false
  argument :vac_pass, Boolean, required: false
  argument :final_pass, Boolean, required: false
  argument :el_read, Float, required: false
  argument :acc_read, Float, required: false
  argument :acc_pass, Boolean, required: false
  argument :vip_problems, String, required: false
  argument :vac_reading, Float, required: false
  argument :vac_ref_reading, Float, required: false
  argument :certificate_number, String, required: false
  argument :batch, Int, required: false

  argument :customer_id, Int, required: false
  argument :model_number, String, required: false
  argument :serial_number, String, required: false
  argument :tolerance, Float, required: false

  field :calibration, Types::CalibrationType, null: false
  field :errors, [String], null: true

  def resolve( id:, user_id:, dosimeter_id:,  date_received:, el_date_in:, el_date_out:, acc_date:, vac_date_in:, vac_date_out:, final_date:, due_date:, el_pass: , vip_pass: , vac_pass: , acc_pass: , final_pass: ,el_read:, acc_read:, vip_problems:, vac_reading:, vac_ref_reading:, certificate_number:, batch:, customer_id:, model_number:, serial_number:, tolerance:)

    if model_number == '' || serial_number == ''
      raise GraphQL::ExecutionError, "Dosimeter model and serial number must not be blank"
    end

    if final_pass == true && (certificate_number == nil || final_date == '')
      raise GraphQL::ExecutionError, "Must enter a certificate number and final pass date for passing dosimeters"
    end
    
    if final_pass == false
      final_date = nil
      certificate_number = nil
      # due_date = nil
    end

    dosimeter = Customer.find(customer_id).dosimeters.where("model_number = ? AND serial_number =  ?", model_number, serial_number ).first
    
    if dosimeter == nil
      dosimeter = DosimeterTemplate.where("model_number = ?", model_number).dup
        dosimeter = Dosimeter.create!(
          model_number: dosimeter.first.model_number,
          serial_number: serial_number,
          range: dosimeter.first.range,
          is_r: dosimeter.first.is_r,
          is_mr: dosimeter.first.is_mr,
          is_sv: dosimeter.first.is_sv,
          is_msv: dosimeter.first.is_msv,
          customer_id: customer_id
        )
    end
    
    if tolerance == 0.0 || nil
      tolerance = 0.1
    end

    if id
      begin
        #! IF WE ARE UPDATING A CALIBRATION RECORD
        calibration = Calibration.find(id)
        calibration.update!(user_id: user_id, 
                          dosimeter_id: dosimeter.id,
                          tolerance: tolerance, 
                          date_received: date_received, 
                          el_date_in: el_date_in, 
                          el_date_out: el_date_out, 
                          acc_date: acc_date, 
                          acc_pass: acc_pass, 
                          vac_date_in: vac_date_in, 
                          vac_date_out: vac_date_out, 
                          final_date: final_date, 
                          # ship_back_date: ship_back_date, 
                          due_date: due_date, 
                          el_pass: el_pass, 
                          vip_pass: vip_pass, 
                          vac_pass: vac_pass, 
                          final_pass: final_pass, 
                          el_read: el_read, 
                          acc_read: acc_read, 
                          vip_problems: vip_problems, 
                          vac_reading: vac_reading, 
                          vac_ref_reading: vac_ref_reading, 
                          batch: batch,
                          certificate_number: certificate_number
        )
        { calibration: calibration }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
    else
      #! IF WE ARE CREATING A NEW CALIBRATION RECORD
      begin
        calibration = Calibration.create!(user_id: user_id, 
                                          dosimeter_id: dosimeter.id,
                                          tolerance: tolerance, 
                                          date_received: date_received, 
                                          el_date_in: el_date_in, 
                                          el_date_out: el_date_out, 
                                          acc_date: acc_date, 
                                          acc_pass: acc_pass, 
                                          vac_date_in: vac_date_in, 
                                          vac_date_out: vac_date_out, 
                                          final_date: final_date, 
                                          # ship_back_date: ship_back_date, 
                                          due_date: due_date, 
                                          el_pass: el_pass, 
                                          vip_pass: vip_pass, 
                                          vac_pass: vac_pass, 
                                          final_pass: final_pass, 
                                          el_read: el_read, 
                                          acc_read: acc_read, 
                                          vip_problems: vip_problems, 
                                          vac_reading: vac_reading, 
                                          vac_ref_reading: vac_ref_reading, 
                                          batch: batch,
                                          certificate_number: certificate_number)
          {calibration: calibration}
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
    end
  end
end