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
    if final_pass == false
      final_date = nil
      certificate_number = nil
      due_date = nil
    end

    dosimeter = Customer.find(customer_id).dosimeters.where("model_number = ? AND serial_number =  ?", model_number, serial_number ).first
    
    if dosimeter == nil
      dosimeter = Dosimeter.where("model_number = ?", model_number).first.dup
      dosimeter.update(
        serial_number: serial_number,
        customer_id: customer_id
      )
    end
    
    if tolerance == 0.0 || nil
      tolerance = 0.1
    end

    if id
      #! IF WE ARE UPDATING A CALIBRATION RECORD
      calibration = Calibration.find(id)
      calibration.update(user_id: user_id, 
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
      if calibration.save!
        {

        }
      else
        {

        }
      end

    else
      #! IF WE ARE CREATING A NEW CALIBRATION RECORD
      calibration = Calibration.new(user_id: user_id, 
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
        if calibration.save!
          {

          }
        else
          {
            # todo get flash messages working
          }
      end
    end
  end
end