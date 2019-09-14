module Types
  class QueryType < Types::BaseObject

    field :customers, [Types::CustomerType], null: false
    field :dosimeters, [Types::DosimeterType], null: false
    field :users, [Types::UserType], null: false

    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    field :customer, Types::CustomerType, null: false do
      argument :id, ID, required: true
    end
    

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end

    def customers
      Customer.all
    end

    def customer(id:)
      Customer.find(id)
    end

    def dosimeters
      Dosimeter.all
    end

  end
end
