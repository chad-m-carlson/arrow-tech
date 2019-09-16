module Types
  class CalibrationType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :tolerance, Integer, null: false
    field :date_received, String, null: true
    field :EL_date_in, String, null: true
    field :EL_date_out, String, null: true
    field :ACC_date, String, null: true
    field :VAC_date_in, String, null: true
    field :VAV_date_out, String, null: true
    field :final_date, String, null: true
    field :ship_back_date, String, null: true
    field :due_date, String, null: true
    field :EL_pass, Boolean, null: true
    field :VIP_pass, Boolean, null: true
    field :VAC_pass, Boolean, null: true
    field :final_pass, Boolean, null: true
    field :EL_read, Integer, null: true
    field :ACC_read, Integer, null: true
    field :VIP_problems, String, null: true
    field :VAC_reading, Integer, null: true
    field :VAC_ref_reading, Integer, null: true
    field :certificate_number, String, null: true
    field :batch, Integer, null: true
    
    field :dosimeter, Types::DosimeterType, null: false do
      argument :id, ID, required: true
    end
    
    def dosimeter(id:)
      Calibration.find(id).dosimeter
    end
  end
end
