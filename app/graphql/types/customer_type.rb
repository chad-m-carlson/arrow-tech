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
    field :dosimeters, [Types::DosimeterType], null: true
    field :dosimeter_count, Integer, null: true

    def dosimeter_count
      object.dosimeters.size
    end

  end
end
