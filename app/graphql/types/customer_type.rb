module Types
  class CustomerType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :street_address_1, String, null: false
    field :street_address_2, String, null: true
    field :city, String, null: false
    field :state, String, null: true
    field :zip, String, null: true
    field :country, String, null: true
    field :email, String, null: true


    field :dosimeter_count, Integer, null: true

    field :dosimeters, [Types::DosimeterType], null: true do
      argument :id, ID, required: true
    end
    
    field :calibrations, [Types::CalibrationType], null: false do
      argument :id, ID, required: true
    end

    def dosimeters(id:)
      Customer.find(id).dosimeters
    end

    def dosimeter_count
      object.dosimeters.size
    end

    def calibrations(id:)
      Customer.find(id).calibrations
    end

    # def unique_dosimeters_by_customer(id:)
    #   Dosimeter.find_by_sql(["
    #   WITH uniq_dosimeter (id, model_number, customer_id)
    #   AS(
    #   SELECT id, model_number, customer_id
    #   FROM dosimeters
    #   WHERE id IN
    #   (SELECT MIN(id) 
    #   FROM dosimeters 
    #   GROUP BY model_number 
    #   ))
    #   SELECT id, model_number
    #   FROM uniq_dosimeter
    #   WHERE customer_id = ?
    #   ", id])
    # end

  end
end
