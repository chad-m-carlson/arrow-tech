module Types
  class CalibrationType < Types::BaseObject
    field :id, ID, null: true
    field :user_id, Int, null: true
    field :dosimeter_id, Int, null: true
    field :calibrator_id, Int, null: true
    field :tolerance, Float, null: true
    field :date_received, String, null: true
    field :el_date_in, String, null: true
    field :el_date_out, String, null: true
    field :acc_date, String, null: true
    field :vac_date_in, String, null: true
    field :vac_date_out, String, null: true
    field :final_date, String, null: true
    field :ship_back_date, String, null: true
    field :due_date, String, null: true
    field :el_pass, Boolean, null: true
    field :vip_pass, Boolean, null: true
    field :vac_required, Boolean, null: true
    field :vac_pass, Boolean, null: true
    field :final_pass, Boolean, null: true
    field :el_read, Float, null: true
    field :acc_read, Float, null: true
    field :acc_pass, Boolean, null: true
    field :vip_problems, String, null: true
    field :vac_reading, Float, null: true
    field :vac_ref_reading, Float, null: true
    field :certificate_number, String, null: true
    field :batch, Int, null: true
    field :tech_first_name, String, null: false
    field :tech_last_name, String, null: false
    field :el_test_performed, Boolean, null: true
    field :acc_test_performed, Boolean, null: true
    field :vac_test_performed, Boolean, null: true
    field :vip_test_performed, Boolean, null: true

    field :calibrator, Types::CalibratorType, null: true
    field :dosimeter, Types::DosimeterType, null: false
    field :user, Types::UserType, null: false

    def calibrator
      object.calibrator
    end

    def dosimeter
      object.dosimeter
    end

    def user
      object.user
    end

    # field :dosimeter, Types::DosimeterType, null: false do
    #   argument :id, ID, required: true
    # end
    
    # def dosimeter(id:)
    #   Calibration.find(id).dosimeter
    # end
  end
end
