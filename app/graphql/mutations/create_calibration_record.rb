class Mutations::CreateCalibrationRecord < Mutations::BaseMutation
  argument :id, ID, required: false
  argument :user_id, Int, required: false
  argument :dosimeter_id, Int, required: false
  argument :tolerance, Int, required: false
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
  argument :el_read, Int, required: false
  argument :acc_read, Int, required: false
  argument :acc_pass, Boolean, required: false
  argument :vip_problems, String, required: false
  argument :vac_reading, Int, required: false
  argument :vac_ref_reading, Int, required: false
  argument :certificate_number, String, required: false
  argument :batch, Int, required: false

  field :calibration, Types::CalibrationType, null: false
  field :errors, [String], null: false

  
  def resolve( user_id:, date_received:, el_date_in:, el_date_out:, acc_date:, vac_date_in:, vac_date_out:, final_date:, due_date:, el_pass: , vip_pass: , vac_pass: , acc_pass: , final_pass: ,el_read:, acc_read:, vip_problems:, vac_reading:, vac_ref_reading:, batch:)

    # user_id = current_user.id
    binding.pry
    dosimeter = Customer.find(82).dosimeters.where("model_number = 'AT 715' AND serial_number =  'dRwiCcdTxYv8ZNN'").first.id

    calibration = Calibration.new(
                                  user_id: user_id, 
                                  # todo need to enter in these parameters safely ie: "Client.where("orders_count = ?", params[:orders])"
                                  dosimeter_id: dosimeter,
                                  tolerance: 0.1, 
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
                                  # certificate_number: certificate_number, 
                                  batch: batch
                                  )
    if calibration.save
      {
        calibration: calibration,
        errors: [],
      }
    else
      {
        user: nil,
        errors: calibration.errors.full_message,
      }
    end
    

  end
end