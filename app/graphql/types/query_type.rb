module Types
  class QueryType < Types::BaseObject

    field :calibrations, [Types::CalibrationType], null: false
    field :customers, [Types::CustomerType], null: false
    field :dosimeters, [Types::DosimeterType], null: false
    field :users, [Types::UserType], null: false
    
    field :calibration, Types::CalibrationType, null: false do
      argument :id, ID, required: true
    end
    
    field :customer, Types::CustomerType, null: false do
      argument :id, ID, required: true
    end
    
    field :dosimeter, Types::DosimeterType, null: false do
      argument :id, ID, required: true
    end

    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    def calibrations
      Calibration.all
    end

    def customers
      Customer.all
    end

    def dosimeters
      Dosimeter.all
    end

    def users
      User.all
    end

    def calibration(id:)
      Calibration.find(id)
    end

    def customer(id:)
      Customer.find(id)
    end
    
    def dosimeter(id:)
      Dosimeter.find(id)
    end
    
    def user(id:)
      User.find(id)
    end

  end
end
