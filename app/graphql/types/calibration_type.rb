module Types
  class CalibrationType < Types::BaseObject
    field :id, ID, null: true
    field :user_id, Int, null: true
    field :dosimeter_id, Int, null: true
    field :tolerance, Int, null: true
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
    
    field :dosimeter, Types::DosimeterType, null: false do
      argument :id, ID, required: true
    end
    
    def dosimeter(id:)
      Calibration.find(id).dosimeter
    end
  end
end
