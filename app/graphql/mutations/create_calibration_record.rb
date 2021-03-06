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
  argument :vac_required, Boolean, required: false
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
  argument :tech_first_name, String, required: true
  argument :tech_last_name, String, required: true
  argument :el_test_performed, Boolean, required: true
  argument :vac_test_performed, Boolean, required: true
  argument :vip_test_performed, Boolean, required: true
  argument :acc_test_performed, Boolean, required: true
  argument :due_date_required, Boolean, required: true

  argument :customer_id, Int, required: false
  argument :model_number, String, required: false
  argument :serial_number, String, required: false
  argument :tolerance, Float, required: false

  field :calibration, Types::CalibrationType, null: false
  field :messages, String, null: true
  field :dosimeters_in_batch, Int, null: true

  def resolve( id:, user_id:, dosimeter_id:,  date_received:, el_date_in:, el_date_out:, acc_date:, vac_date_in:, vac_date_out:, final_date:, due_date:, el_pass: , vip_pass: , vac_required:,  vac_pass: , acc_pass: , final_pass: ,el_read:, acc_read:, vip_problems:, vac_reading:, vac_ref_reading:, certificate_number:, batch:, customer_id:, model_number:, serial_number:, tolerance:, tech_first_name:, tech_last_name:, el_test_performed:, vac_test_performed:, vip_test_performed:, acc_test_performed:, due_date_required:)

    @dosimeters_in_batch = Calibration.where(batch: batch).count
    
    if model_number == '' || serial_number == ''
      raise GraphQL::ExecutionError, "Dosimeter model and/or serial number must not be blank"
    end

    if final_pass == true && certificate_number == (nil || '')
      raise GraphQL::ExecutionError, "Must enter a certificate number for passing dosimeters"
    end

    if final_pass == true && due_date == (nil || '') && due_date_required == true
      raise GraphQL::ExecutionError, "Must enter a due date for passing dosimeters"
    end

    if final_pass == false
      # final_date = nil
      certificate_number = nil
      due_date = nil
    end
    unless el_test_performed
      el_pass = nil
      el_read = nil
    end
    unless vac_test_performed
      vac_pass = nil
      vac_reading = nil
    end
    unless vip_test_performed
      vip_pass = nil 
      vip_problems = nil
    end
    unless acc_test_performed
      acc_pass = nil 
      acc_read = nil
    end
    unless due_date_required 
      due_date = nil 
    end

    dosimeter = Customer.find(customer_id).dosimeters.where("model_number = ? AND serial_number =  ?", model_number, serial_number ).first

    if dosimeter == nil
      @message = "New Dosimeter record created"
      dosimeter = DosimeterTemplate.where("model_number = ?", model_number).dup
      begin
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

      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
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
                            due_date_required: due_date_required,
                            el_pass: el_pass,
                            vip_pass: vip_pass,
                            vac_required: vac_required,
                            vac_pass: vac_pass,
                            final_pass: final_pass,
                            el_read: el_read,
                            acc_read: acc_read,
                            vip_problems: vip_problems,
                            vac_reading: vac_reading,
                            vac_ref_reading: vac_ref_reading,
                            batch: batch,
                            certificate_number: certificate_number,
                            tech_first_name: tech_first_name,
                            tech_last_name: tech_last_name,
                            el_test_performed: el_test_performed,
                            vip_test_performed: vip_test_performed,
                            vac_test_performed: vac_test_performed,
                            acc_test_performed: acc_test_performed)
        { calibration: calibration,
          messages: @message,
          dosimeters_in_batch: @dosimeters_in_batch }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
    else
      # ! IF WE ARE CREATING A NEW CALIBRATION RECORD
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
                                          due_date_required: due_date_required,
                                          el_pass: el_pass, 
                                          vip_pass: vip_pass, 
                                          vac_required: vac_required,
                                          vac_pass: vac_pass, 
                                          final_pass: final_pass, 
                                          el_read: el_read, 
                                          acc_read: acc_read, 
                                          vip_problems: vip_problems, 
                                          vac_reading: vac_reading, 
                                          vac_ref_reading: vac_ref_reading, 
                                          batch: batch,
                                          certificate_number: certificate_number,
                                          tech_first_name: tech_first_name,
                                          tech_last_name: tech_last_name,
                                          el_test_performed: el_test_performed,
                                          vip_test_performed: vip_test_performed,
                                          vac_test_performed: vac_test_performed,
                                          acc_test_performed: acc_test_performed)
        { calibration: calibration,
          messages: @message }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("#{e.record.errors.full_messages.join(', ')}") 
      end
    end
  end
end